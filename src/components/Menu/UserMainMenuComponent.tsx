import * as React from 'react'
import { MenuComponent } from './MenuComponent';
import MenuItemComponent from './MenuItemComponent';
import { isLoggedIn } from '../../helpers';
import ShoppingCartMenuItem from './ShoppingCartMenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

type Props = {
  toggleSubMenu: () => void
  closeSubMenu: () => void
}
type State = {
  showSearch: boolean
}

export class UserMainMenuComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      showSearch: false
    }
  }

  render() {
    return (
      <div className='user-main-menu-wrapper'>
        <MenuComponent classes='user-main-menu float-right'>
          {this.state.showSearch &&
            <div className='search-wrapper'>
              <form className='search-form'>
                <input
                  type='text'
                  name='search'
                  placeholder='Voer zoekterm in en druk op enter..'
                  className='search-input sm'
                />
                <button type='submit' className='btn btn-link'><FontAwesomeIcon icon={faSearch} size='lg' /></button>
              </form>
            </div>
          }
          {!this.state.showSearch && <MenuItemComponent to='' onClick={() => this.setState({ showSearch: true })}><FontAwesomeIcon icon={faSearch} size='lg' /></MenuItemComponent>}
          <ShoppingCartMenuItem />
          {isLoggedIn() ?
            <li className="menu-item nav-item">
              <a
                href="#"
                className='nav-link'
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  this.props.toggleSubMenu()
                }}
              >
                <FontAwesomeIcon icon={faUser} size='lg' />
              </a>
            </li> :
            <>
              <MenuItemComponent to='/login'>
                <button type='button' className='btn btn-outline-primary btn-sm'>Inloggen</button>
              </MenuItemComponent>
              <MenuItemComponent to='/register'>
                <button type='button' className='btn btn-primary btn-sm'>Registreren</button>
              </MenuItemComponent>
            </>
          }
        </MenuComponent>
      </div>
    )
  }
}
