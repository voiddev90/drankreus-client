import * as React from 'react'
import MenuComponent from './MenuComponent'
import { NavLink } from 'react-router-dom'
import MenuItemComponent from './Menu/MenuItemComponent';
import { isLoggedIn, logOut } from '../helpers';
import ShoppingCartMenuItem from './Menu/ShoppingCartMenuItem';

type Props = {}
type State = {}

export default class HeaderComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <header className='site-header'>
        <div className='site-header-wrapper'>
          <div className='site-title-wrapper'>
            <h2 className='site-title'>
              <NavLink to='/'>DrankReus</NavLink>
            </h2>
          </div>
          <div className='search-wrapper'>
            <form className='search-form'>
              <input
                type='text'
                name='search'
                placeholder='Voer zoekterm in en druk op enter..'
              />
              <button type='submit'>Zoek</button>
            </form>
          </div>
          <div className='main-menu-wrapper'>
            <MenuComponent classes='main-menu'>
              <MenuItemComponent to='/products' name='Producten' />
              <MenuItemComponent to='/' name='Contact' />
              <MenuItemComponent to='/' name='Klantenservice' />
              {!isLoggedIn() ? (
                <MenuItemComponent to='/login' name='Inloggen' />
              ) : (
                <>
                  <MenuItemComponent to='/profile' name='Jouw profiel' />
                  <MenuItemComponent
                    to='/'
                    name='Uitloggen'
                    navLinkProps={{ onClick: () => logOut() }}
                  />
                </>
              )}
              <ShoppingCartMenuItem />
            </MenuComponent>
          </div>
        </div>
      </header>
    )
  }
}
