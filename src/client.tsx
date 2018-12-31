import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import BaseComponent from './components/BaseComponent'
import HomeComponent from './components/HomeComponent'
import SearchOverviewComponent from './components/SearchOverviewComponent'
import { PageLoaderComponent } from './components/PageLoaderComponent'
import { ProductDetailComponent } from './components/Products/ProductDetailComponent'
import { CheckoutLoaderComponent } from './components/CheckoutLoaderComponent'
import { ReactCookieProps, withCookies } from 'react-cookie'
import { addToCart } from './helpers'
import { AccountLoaderComponent } from './components/AccountLoaderComponent'
import { AdminLoaderComponent } from './components/Admin/AdminLoaderComponent'

export type ClientProps = ReactCookieProps

const Client: React.SFC<ClientProps> = clientProps => {
  return (
    <BrowserRouter>
      <Switch>
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
          path='/search/:slug'
          render={props => {
            return (
              <BaseComponent>
                <SearchOverviewComponent {...props} />
              </BaseComponent>
            )
          }}
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
  )
}

//export default withCookies(Client)
export default withCookies(Client as any)
