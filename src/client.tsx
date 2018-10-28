import * as React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import BaseComponent from "./components/BaseComponent"
import HomeComponent from "./components/HomeComponent"
import { PageLoaderComponent } from "./components/PageLoaderComponent"
import SignUpComponent from "./components/SignUpComponent"
import { isLoggedIn, getLoggedInuser } from "./helpers"

export type ClientProps = {}
export type ClientState = {}

export default class Client extends React.Component<ClientProps, ClientState> {

  constructor(props: ClientProps) {
    super(props)
  }

  componentDidMount() {
    console.log(isLoggedIn())
    console.log(getLoggedInuser())
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path="/"
            render={() => {
              return (
                <BaseComponent>
                  <HomeComponent />
                </BaseComponent>
              )
            }}
          />
          <Route
            path="/register"
            render={() => {
              return (
                <BaseComponent>
                  {isLoggedIn() ? (
                    <Redirect to={{ pathname: "/" }} />
                  ) : (
                    <SignUpComponent />
                  )}
                </BaseComponent>
              )
            }}
          />
          <Route
            path="/:slug"
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
}
