import * as React from 'react'
import { MenuComponent } from '../../Menu/MenuComponent'
import MenuItemComponent from '../../Menu/MenuItemComponent'

type Props = {}

export const AdminUserSubMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='panel admin-products-sub-menu-wrapper'>
      <MenuComponent classes='admin-products-sub-menu'>
        <MenuItemComponent to='/admin/users'>Overzicht</MenuItemComponent>
        <MenuItemComponent to='/admin/users/new'>Nieuw</MenuItemComponent>
      </MenuComponent>
    </div>
  )
}
