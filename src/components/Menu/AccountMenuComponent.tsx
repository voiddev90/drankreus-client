import * as React from 'react'
import { MenuComponent } from './MenuComponent'
import MenuItemComponent from './MenuItemComponent'
import { loggedInUserIsAdmin } from '../../helpers'

type Props = {}

export const AccountMenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='account-menu-wrapper'>
      <MenuComponent classes='account-menu'>
        <MenuItemComponent to='/cart'>Winkelwagen</MenuItemComponent>
        <MenuItemComponent to='/account/favourites'>Favorieten</MenuItemComponent>
        <MenuItemComponent to='/account/history'>Bestelgeschiedenis</MenuItemComponent>
        {loggedInUserIsAdmin() && (
          <MenuItemComponent to='/admin'>Administratie</MenuItemComponent>
        )}
      </MenuComponent>
    </div>
  )
}
