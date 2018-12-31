import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { MainMenuComponent } from './Menu/MainMenuComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserMainMenuComponent } from './Menu/UserMainMenuComponent';
import { MenuComponent } from './Menu/MenuComponent';
import MenuItemComponent from './Menu/MenuItemComponent';
import { logOut } from '../helpers';

type Props = {}
type State = {
  showSubMenu: boolean
}

export default class HeaderComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showSubMenu: false
    }
  }

  render() {
    return (
      <header className='site-header'>
        <div className='site-header-wrapper'>
          <div className='site-title-wrapper'>
            <h2 className='site-title'>DrankReus</h2>
          </div>
          <MainMenuComponent />
          <UserMainMenuComponent toggleSubMenu={() => this.setState({ showSubMenu: !this.state.showSubMenu })} />
        </div>
        {this.state.showSubMenu && <div className='profile-submenu'>
          <MenuComponent classes='submenu'>
            <MenuItemComponent to='/profile'>Mijn profiel</MenuItemComponent>
            <MenuItemComponent to='/favourites'>Mijn wenslijst</MenuItemComponent>
            <MenuItemComponent to='/history'>Mijn bestelgeschiedenis</MenuItemComponent>
            <MenuItemComponent to='/' onClick={() => logOut()}>Uitloggen</MenuItemComponent>
          </MenuComponent>
        </div>}
      </header>
    )
  }
}
