import * as React from 'react'
import { MenuComponent } from './MenuComponent'
import MenuItemComponent from './MenuItemComponent'
import { loggedInUserIsAdmin, getLoggedInuser } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

type Props = {}

export const AccountMenuComponent: React.SFC<Props> = (props: Props) => {
  const loggedInUser = getLoggedInuser()
  const name = `${loggedInUser.firstName} ${loggedInUser.prefix && ` ${loggedInUser.prefix} `}${loggedInUser.lastName}`
  return (
    <div className='account-menu-wrapper'>
      <MenuComponent classes='account-menu' menuClasses='flex-column'>
        <MenuItemComponent to='/profile'><FontAwesomeIcon icon={faUserCircle} size='3x' />{name}</MenuItemComponent>
        <MenuItemComponent to='/account/history'>Bestelgeschiedenis</MenuItemComponent>
        <MenuItemComponent to='/account/favourites'>Favorieten</MenuItemComponent>
        <MenuItemComponent to='/account/history'>Bestelgeschiedenis</MenuItemComponent>
        {loggedInUserIsAdmin() && (
          <MenuItemComponent to='/admin'>Administratie</MenuItemComponent>
        )}
      </MenuComponent>
    </div>
  )
}
