
import * as React from "react"
import MenuItemComponent from "./Menu/MenuItemComponent"
import { isLoggedIn, getLoggedInuser, logOut } from "../helpers"
import ShoppingCartMenuItem from "./Menu/ShoppingCartMenuItem";

type Props = {}
type State = {}

export default class MainMenuComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <nav className="main-menu">
        <ul className="menu">
          <MenuItemComponent to="/" name="Contact" />
          <MenuItemComponent to="/" name="Klantenservice" />
          {!isLoggedIn() ? (
            <MenuItemComponent to="/login" name="Inloggen" />
          ) : (
            <>
              <MenuItemComponent to="/profile" name="Jouw profiel" />
              <MenuItemComponent
                to="/"
                name="Uitloggen"
                navLinkProps={{ onClick: () => logOut() }}
              />
            </>
          )}
          <ShoppingCartMenuItem />
        </ul>
      </nav>
    )
  }
}
