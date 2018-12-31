import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import BaseComponent from './components/BaseComponent'
import HomeComponent from './components/HomeComponent'
import { PageLoaderComponent } from './components/PageLoaderComponent'
import { ProductDetailComponent } from './components/Products/ProductDetailComponent'
import { CheckoutLoaderComponent } from './components/CheckoutLoaderComponent'
import { ReactCookieProps, withCookies } from 'react-cookie'
import { addToCart, ageValidated, validateAge } from './helpers'
import { AccountLoaderComponent } from './components/AccountLoaderComponent'
import { AdminLoaderComponent } from './components/Admin/AdminLoaderComponent'
import { Dialog, DialogTitle, Button } from '@material-ui/core';

export type ClientProps = ReactCookieProps
export type ClientState = {
  redirect: boolean
  dialogOpen: boolean
}

class Client extends React.Component<ClientProps, ClientState>{
  constructor(props: ClientProps) {
    super(props)

    this.state = {
      redirect: false,
      dialogOpen: !ageValidated()
    }
  }

  render() {
    const clientProps = this.props
    localStorage.removeItem('validAge')
    return (
      <>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Je moet 18 jaar of ouder zijn om deze site te bezoeken</DialogTitle>
          <div>
            <Button color='primary' variant='contained' onClick={_ => {
              validateAge()
              this.setState({ redirect: false, dialogOpen: false })
            }}>Ja, ik ben 18 jaar of ouder</Button>
            <Button color='secondary' variant='contained' onClick={_ => this.setState({ redirect: true })}>Nee</Button>
          </div>
        </Dialog>
        <BrowserRouter>
          <Switch>
            {this.state.redirect &&
              <Route
                render={() => {
                  window.location.href = 'https://nix18.nl/'
                  return <Redirect to='/' />
                }}
              />}
            <Route
              exact
              path='/'
              render={() => {
                return (
                  <BaseComponent>
                    <HomeComponent />
                  </BaseComponent>
                )
              }}
            />
            <Route
              path='/product/:slug'
              render={props => {
                return (
                  <BaseComponent>
                    <ProductDetailComponent
                      {...props}
                      onAdd={addToCart(clientProps.cookies)}
                    />
                  </BaseComponent>
                )
              }}
            />
            <Route
              path='/checkout/:slug'
              render={props => {
                return (
                  <BaseComponent>
                    <CheckoutLoaderComponent {...props} />
                  </BaseComponent>
                )
              }}
            />
            <Route
              path='/account/:slug'
              render={props => {
                return (
                  <BaseComponent>
                    <AccountLoaderComponent {...props} />
                  </BaseComponent>
                )
              }}
            />
            <Route
              path='/admin'
              component={AdminLoaderComponent}
            />
            <Route
              path='/admin/:slug'
              component={AdminLoaderComponent}
            />
            <Route
              path='/:slug'
              render={props => {
                return (
                  <BaseComponent>
                    <PageLoaderComponent {...props} />
                  </BaseComponent>
                )
              }}
            />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

//export default withCookies(Client)
export default withCookies(Client as any)
