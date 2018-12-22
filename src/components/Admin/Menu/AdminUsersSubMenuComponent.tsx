import * as React from 'react'
import { MenuComponent } from '../../Menu/MenuComponent'
import MenuItemComponent from '../../Menu/MenuItemComponent'

type Props = {}

export const AdminProductSubMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='panel admin-main-menu-wrapper'>
      <MenuComponent classes='admin-main-menu'>
        <MenuItemComponent to='/admin/users' name='Overzicht' />
        <MenuItemComponent to='/admin/users/new' name='Nieuw' />
      </MenuComponent>
    </div>
  )
}
