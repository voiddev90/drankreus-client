import * as React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import BaseComponent from "./components/BaseComponent"
import HomeComponent from "./components/HomeComponent"
import { PageLoaderComponent } from "./components/PageLoaderComponent"
import { WithDataState, User, UserLoginState, LoginResponse } from "./model"
import Axios, { AxiosResponse, AxiosError } from "axios"
import SignUpComponent from "./components/SignUpComponent"

export type ClientProps = {}
export type ClientState = UserLoginState

export default class Client extends React.Component<ClientProps, ClientState> {
  constructor(props: ClientProps) {
    super(props)

    this.state = {
      type: "notLoggedIn"
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(email: string, password: string) {
    console.log(email, password)
    Axios.post("http://localhost:5000/auth/login", {
      email: email,
      password: password
    })
      .then((value: AxiosResponse<LoginResponse>) => {
        console.log(value)
        this.setState({
          type: "loggedIn",
          JWT: value.data.access_token,
          user: value.data.user
        })
      })
      .catch((error: AxiosError) => {
        console.log(error)
        this.setState({ type: "error", message: error.message })
      })
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
                  <HomeComponent loggedInState={this.state} />
                </BaseComponent>
              )
            }}
          />
          <Route
            path="/register"
            render={() => {
              return (
                <BaseComponent>
                  {this.state.type == "loggedIn" ? (
                    <Redirect to={{ pathname: "/" }} />
                  ) : (
                    <SignUpComponent loggedInState={this.state} />
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
                  <PageLoaderComponent
                    {...props}
                    loggedInState={this.state}
                    loginHandler={this.handleLogin}
                  />
                </BaseComponent>
              )
            }}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}
