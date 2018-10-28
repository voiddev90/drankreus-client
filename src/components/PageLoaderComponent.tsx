import * as React from "react"
import { RouteComponentProps, Redirect } from "react-router"
import LoginComponent from "./LoginComponent"
import NotFoundComponent from "./NotFoundComponent"
import { isLoggedIn } from "../helpers"

type Props = RouteComponentProps<{ slug: string }>

export const PageLoaderComponent: React.SFC<Props> = (props: Props) => {
  switch (props.match.params.slug) {
    case "login":
      return isLoggedIn() ? <Redirect to={{pathname: '/'}} /> : <LoginComponent />
    default:
      return <NotFoundComponent />
  }
}
