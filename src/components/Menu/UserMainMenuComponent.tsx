import * as React from 'react'
import { MenuComponent } from './MenuComponent';
import MenuItemComponent from './MenuItemComponent';
import { isLoggedIn } from '../../helpers';
import ShoppingCartMenuItem from './ShoppingCartMenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';

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
        <MenuComponent classes='user-main-menu float-right'>
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
              <MenuItemComponent to='/login'>
                <Button variant='outlined' color='primary' size='small'>Inloggen</Button>
              </MenuItemComponent>
              <MenuItemComponent to='/register'>
                <Button variant='contained' color='primary' size='small'>Registreren</Button>
              </MenuItemComponent>
            </>
          }
        </MenuComponent>
      </div>
    )
  }
}
