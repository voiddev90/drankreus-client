import * as React from 'react'
import { MenuComponent } from './MenuComponent';
import MenuItemComponent from './MenuItemComponent';
import { isLoggedIn, logOut } from '../../helpers';
import ShoppingCartMenuItem from './ShoppingCartMenuItem';

type Props = {}

export const MainMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='main-menu-wrapper'>
      <MenuComponent classes='main-menu'>
        <MenuItemComponent to='/'>Home</MenuItemComponent>
        <MenuItemComponent to='/products'>Producten</MenuItemComponent>
        <MenuItemComponent to='/'>Contact</MenuItemComponent>
      </MenuComponent>
    </div>
  )
}
