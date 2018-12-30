import * as React from "react"
import { NavLink } from "react-router-dom"
import * as H from 'history'

type Props = {
  name: string
  to: H.LocationDescriptor
  navLinkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>
}
type State = {}

export default class MenuItemComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <li className="menu-item">
        <NavLink {...this.props.navLinkProps} to={this.props.to}>
          {this.props.name}
        </NavLink>
      </li>
    )
  }
}
