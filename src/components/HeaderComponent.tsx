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
      <header className='site-header max-width container-fluid'>
        <div className='site-header-wrapper row'>
          <div className='site-title-wrapper col-2'>
            <h2 className='site-title'>DrankReus</h2>
          </div>
          <div className='col-5'>
            <MainMenuComponent />
          </div>
          <div className='col-5'>
            <UserMainMenuComponent toggleSubMenu={() => this.setState({ showSubMenu: !this.state.showSubMenu })} />
          </div>
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

