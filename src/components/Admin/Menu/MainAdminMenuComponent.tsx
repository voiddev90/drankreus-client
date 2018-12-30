import * as React from 'react'
import { MenuComponent } from '../../Menu/MenuComponent'
import MenuItemComponent from '../../Menu/MenuItemComponent'

type Props = {}

export const MainAdminMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='panel admin-main-menu-wrapper'>
      <MenuComponent classes='admin-main-menu'>
        <MenuItemComponent to='/admin' name='Dashboard' />
        <MenuItemComponent to='/admin/products' name='Producten' />
        <MenuItemComponent to='/admin/users' name='Gebruikers' />
        <MenuItemComponent to='/' name='Terug naar de webshop' />
      </MenuComponent>
    </div>
  )
}
