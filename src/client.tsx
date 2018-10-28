import * as React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import BaseComponent from "./components/BaseComponent"
import HomeComponent from "./components/HomeComponent"
import { PageLoaderComponent } from "./components/PageLoaderComponent"

export type ClientProps = {}

export const Client: React.SFC<ClientProps> = () => {
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
