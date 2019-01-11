import * as React from 'react'
import { MainMenuComponent } from './Menu/MainMenuComponent';
import { UserMainMenuComponent } from './Menu/UserMainMenuComponent';
import { MenuComponent } from './Menu/MenuComponent';
import MenuItemComponent from './Menu/MenuItemComponent';
import { logOut, loggedInUserIsAdmin } from '../helpers';

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

    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  toggleMenu() {
    this.setState({ showSubMenu: !this.state.showSubMenu })
  }

  closeMenu() {
    this.setState({ showSubMenu: false })
  }

  render() {
    return (
      <header className='site-header max-width container-fluid'>
        <div className='site-header-wrapper row'>
          <div className='site-title-wrapper col-1'>
            <h2 className='site-title'>DrankReus</h2>
          </div>

          <div className='col-4'>
            <MainMenuComponent closeSubMenu={this.closeMenu} />
          </div>
          <div className='col-7'>
            <UserMainMenuComponent toggleSubMenu={this.toggleMenu} closeSubMenu={this.closeMenu} />
          </div>
        </div>
        {this.state.showSubMenu && <div className='profile-submenu'>
          <MenuComponent classes='submenu'>
            <MenuItemComponent to='/profile' onClick={() => this.closeMenu()}>Mijn profiel</MenuItemComponent>
            <MenuItemComponent to='/account/favourites' onClick={() => this.closeMenu()}>Mijn wenslijst</MenuItemComponent>
            <MenuItemComponent to='/account/history' onClick={() => this.closeMenu()}>Mijn bestelgeschiedenis</MenuItemComponent>
            {loggedInUserIsAdmin() && (
              <MenuItemComponent to='/admin'>Administratie</MenuItemComponent>
            )}
            <MenuItemComponent to='/' onClick={() => {
              logOut()
              this.closeMenu()
            }}>Uitloggen</MenuItemComponent>
          </MenuComponent>
        </div>}
      </header>
    )
  }
}

