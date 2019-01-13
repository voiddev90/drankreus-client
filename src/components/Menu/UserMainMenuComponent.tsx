import * as React from 'react'
import { MenuComponent } from './MenuComponent';
import MenuItemComponent from './MenuItemComponent';
import { isLoggedIn } from '../../helpers';
import ShoppingCartMenuItem from './ShoppingCartMenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchComponent from '../SearchComponent';

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

    this.toggleSearchForm = this.toggleSearchForm.bind(this)
  }

  toggleSearchForm() {
    this.setState({ showSearch: !this.state.showSearch })
  }

  render() {
    return (
      <div className='user-main-menu-wrapper'>
        <MenuComponent classes='user-main-menu float-right'>
          {this.state.showSearch &&
            <div className='search-wrapper'>
            <SearchComponent/> 
            </div>
          }
          {this.state.showSearch ?
            (<li className="menu-item nav-item icon">
              <a href="#" className='nav-link' onClick={(e: React.MouseEvent<HTMLAnchorElement>) => this.toggleSearchForm()} >
                <FontAwesomeIcon icon={faTimes} size='lg' />
              </a>
            </li>) : (<li className="menu-item nav-item icon">
              <a href="#" className='nav-link' onClick={(e: React.MouseEvent<HTMLAnchorElement>) => this.toggleSearchForm()} >
                <FontAwesomeIcon icon={faSearch} size='lg' />
              </a>
            </li>)}
          < ShoppingCartMenuItem />
          {isLoggedIn() ?
            <li className="menu-item nav-item icon">
              <a href="#" className='nav-link' onClick={(e: React.MouseEvent<HTMLAnchorElement>) => this.props.toggleSubMenu()} >
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
