import * as React from "react"
import { RouteComponentProps, Redirect } from "react-router"
import LoginComponent from "./LoginComponent"
import NotFoundComponent from "./NotFoundComponent"
import { isLoggedIn } from "../helpers"
import RegisterComponent from "./RegisterComponent";
import ShoppingCartComponent from "../ShoppingCartComponent";

type Props = RouteComponentProps<{ slug: string }>

export const PageLoaderComponent: React.SFC<Props> = (props: Props) => {
  switch (props.match.params.slug) {
    case "login":
      return isLoggedIn() ? <Redirect to={{pathname: '/'}} /> : <LoginComponent />
    case 'register':
      return isLoggedIn() ? <Redirect to={{pathname: '/'}} /> : <RegisterComponent />
    case 'cart':
      return <ShoppingCartComponent />
    default:
      return <NotFoundComponent />
  }
}
