import * as React from "react"
import { NavLink } from "react-router-dom"
import * as H from 'history'

type Props = {
  to: string
  navLinkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  useLink?: boolean
  className?: string
}
type State = {}

export default class MenuItemComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <li className={`menu-item nav-item${this.props.className ? ` ${this.props.className}` : ''}`}>
        {!this.props.useLink ? <NavLink {...this.props.navLinkProps} to={this.props.to} onClick={this.props.onClick} className='nav-link'>
          {this.props.children}
        </NavLink> : <a href={this.props.to} onClick={this.props.onClick} className='nav-link'>{this.props.children}</a>}
      </li>
    )
  }
}
