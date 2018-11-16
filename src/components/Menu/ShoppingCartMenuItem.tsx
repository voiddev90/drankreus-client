import * as React from 'react'
import { withCookies, ReactCookieProps } from 'react-cookie'
import { NavLink } from "react-router-dom"

type Props = ReactCookieProps & {
  navLinkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>
}

const ShoppingCartMenuItemComponent: React.SFC<Props> = (props: Props) => {
  return (
    <li className="menu-item">
      <NavLink {...props.navLinkProps} to="/shoppingcart">
        
      </NavLink>
    </li>
  )
}

export default withCookies(ShoppingCartMenuItemComponent)
