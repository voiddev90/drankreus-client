import * as React from 'react'
import { MenuComponent } from './MenuComponent'
import MenuItemComponent from './MenuItemComponent'
import { loggedInUserIsAdmin } from '../../helpers'

type Props = {}

export const AccountMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='account-menu-wrapper'>
      <MenuComponent classes='account-menu'>
        <MenuItemComponent to='/cart' name='Winkelwagen' />
        <MenuItemComponent to='/account/favourites' name='Favorieten' />
        <MenuItemComponent to='/account/history' name='Bestelgeschiedenis' />
        {loggedInUserIsAdmin() && (
          <MenuItemComponent to='/admin' name='Administratie' />
        )}
      </MenuComponent>
    </div>
  )
}
