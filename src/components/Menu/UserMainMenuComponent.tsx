import * as React from 'react'
import { MenuComponent } from './MenuComponent';
import MenuItemComponent from './MenuItemComponent';
import { isLoggedIn } from '../../helpers';
import ShoppingCartMenuItem from './ShoppingCartMenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

type Props = {
  toggleSubMenu: () => void
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

  componentDidMount() { }

  render() {
    return (
      <div className='user-main-menu-wrapper'>
        <MenuComponent classes='user-main-menu'>
          {this.state.showSearch &&
            <div className='search-wrapper'>
              <form className='search-form'><input
                type='text'
                name='search'
                placeholder='Voer zoekterm in en druk op enter..'
              />

                <button type='submit'><FontAwesomeIcon icon={faSearch} /></button>
              </form>
            </div>
          }
          {!this.state.showSearch && <MenuItemComponent to='' onClick={() => this.setState({ showSearch: true })}><FontAwesomeIcon icon={faSearch} /></MenuItemComponent>}
          <ShoppingCartMenuItem />
          {isLoggedIn() ?
            <MenuItemComponent to='' onClick={() => this.props.toggleSubMenu()}>
              <FontAwesomeIcon icon={faUser} />
            </MenuItemComponent> :
            <>
              <MenuItemComponent to='/login'>Inloggen</MenuItemComponent>
              <MenuItemComponent to='/register'>Registreren</MenuItemComponent>
            </>
          }
        </MenuComponent>
      </div>
    )
  }
}
