import * as React from 'react'
import MenuItemComponent from './Menu/MenuItemComponent'
import { isLoggedIn, getLoggedInuser, logOut } from '../helpers'
import ShoppingCartMenuItem from './Menu/ShoppingCartMenuItem'

type Props = {
  classes: string
}
type State = {}

export const MenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <nav className={this.props.classes}>
      <ul className='menu'>{this.props.children}</ul>
    </nav>
  )
}
