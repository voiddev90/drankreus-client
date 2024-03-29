import * as React from 'react'
import { MenuComponent } from '../../Menu/MenuComponent'
import MenuItemComponent from '../../Menu/MenuItemComponent'

type Props = {}

export const AdminProductSubMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='panel admin-user-sub-menu-wrapper'>
      <MenuComponent classes='admin-user-sub-menu'>
        <MenuItemComponent to='/admin/products'>Overzicht</MenuItemComponent>
        <MenuItemComponent to='/admin/products/new'>Nieuw</MenuItemComponent>
      </MenuComponent>
    </div>
  )
}
