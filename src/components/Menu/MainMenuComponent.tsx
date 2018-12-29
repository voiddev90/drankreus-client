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
        <MenuItemComponent to='/products' name='Producten' />
        <MenuItemComponent to='/' name='Contact' />
        {!isLoggedIn() ? (
          <MenuItemComponent to='/login' name='Inloggen' />
        ) : (
          <>
            <MenuItemComponent to='/profile' name='Jouw profiel' />
            <MenuItemComponent
              to='/'
              name='Uitloggen'
              navLinkProps={{ onClick: () => logOut() }}
            />
          </>
        )}
        <ShoppingCartMenuItem />
      </MenuComponent>
    </div>
  )
}