import * as React from 'react'
import { MenuComponent } from '../../Menu/MenuComponent'
import MenuItemComponent from '../../Menu/MenuItemComponent'

type Props = {}

export const MainAdminMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='panel admin-main-menu-wrapper'>
      <MenuComponent classes='admin-main-menu'>
        <MenuItemComponent to='/admin'>Dashboard</MenuItemComponent>
        <MenuItemComponent to='/admin/products'>Producten</MenuItemComponent>
        <MenuItemComponent to='/admin/users'>Gebruikers</MenuItemComponent>
        <MenuItemComponent to='/' >Terug naar webshop</MenuItemComponent>
      </MenuComponent>
    </div>
  )
}
