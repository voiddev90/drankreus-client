import * as React from 'react'
import { MenuComponent } from './MenuComponent';
import MenuItemComponent from './MenuItemComponent';
import { isLoggedIn, logOut } from '../../helpers';
import ShoppingCartMenuItem from './ShoppingCartMenuItem';

type Props = {
  closeSubMenu: () => void
}

export const MainMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='main-menu-wrapper'>
      <MenuComponent classes='main-menu'>
        <MenuItemComponent to='/' onClick={() => props.closeSubMenu()}>Home</MenuItemComponent>
        <MenuItemComponent to='/products' onClick={() => props.closeSubMenu()}>Producten</MenuItemComponent>
        <MenuItemComponent to='/' onClick={() => props.closeSubMenu()}>Contact</MenuItemComponent>
      </MenuComponent>
    </div>
  )
}
