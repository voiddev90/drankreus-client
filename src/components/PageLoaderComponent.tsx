import * as React from "react"
import { RouteComponentProps } from "react-router"
import LoginComponent from "./LoginComponent"
import NotFoundComponent from "./NotFoundComponent"
import { UserLoginState } from "../model"
import HomeComponent from "./HomeComponent"

type Props = RouteComponentProps<{ slug: string }> & {
  loginHandler(email: string, password: string): void
  loggedInState: UserLoginState
}

export const PageLoaderComponent: React.SFC<Props> = (props: Props) => {
  switch (props.match.params.slug) {
    case "login":
      return props.loggedInState.type == "loggedIn" ? (
        <HomeComponent loggedInState={props.loggedInState} />
      ) : (
        <LoginComponent loginHandler={props.loginHandler} />
      )
    default:
      return <NotFoundComponent />
  }
}
