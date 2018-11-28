
import * as React from "react"
import MenuItemComponent from "./Menu/MenuItemComponent"
import { isLoggedIn, getLoggedInuser, logOut } from "../helpers"
import ShoppingCartMenuItem from "./Menu/ShoppingCartMenuItem";
import { connect } from "react-redux";
import { User } from "../model";

type Props = {
  user: User
}
type State = {}

class MainMenuComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <nav className="main-menu">
        <ul className="menu">
          <MenuItemComponent to="/products" name="Producten" />
          <MenuItemComponent to="/" name="Contact" />
          <MenuItemComponent to="/" name="Klantenservice" />
          {!this.props.user ? (
            <MenuItemComponent to="/login" name="Inloggen" />
          ) : (
            <>
              <MenuItemComponent to="/profile" name={this.props.user.firstName} />
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

const mapStatetoProps = (state: any) => ({
  user: state.user.user
})

export default connect(mapStatetoProps)(MainMenuComponent)
