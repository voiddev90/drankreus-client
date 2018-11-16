import * as React from "react"
import MenuItemComponent from "./Menu/MenuItemComponent"
import { isLoggedIn, getLoggedInuser, logOut } from "../helpers"

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
              <li className="menu-item">
                Welkom, {getLoggedInuser().firstName}
              </li>
              <MenuItemComponent
                to="/"
                name="Uitloggen"
                navLinkProps={{ onClick: () => logOut() }}
              />
            </>
          )}
        </ul>
      </nav>
    )
  }
}
