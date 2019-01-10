import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { MenuComponent } from './Menu/MenuComponent';
import MenuItemComponent from './Menu/MenuItemComponent';
import { logOut, isLoggedIn } from '../helpers';

type Props = {}

export const FooterComponent: React.SFC<Props> = (props: Props) => {
    return (
        <footer className='site-footer max-width'>
            <div className='site-footer-inner'>
                <div className='site-footer-menus'>
                    <div className='contact-menu-wrapper footer-menu'>
                        <h4 className='footer-menu-title'>Contact</h4>
                        <MenuComponent classes='contact-menu' menuClasses='flex-column'>
                            <MenuItemComponent to='tel:0044345678903' useLink>+44 345 678 903</MenuItemComponent>
                            <MenuItemComponent to='mailto:info@drankreus.com' useLink>info@drankreus.com</MenuItemComponent>
                            <MenuItemComponent to='/contact'>Contact</MenuItemComponent>
                        </MenuComponent>
                    </div>
                    <div className='account-menu-wrapper footer-menu'>
                        <h4 className='footer-menu-title'>Account</h4>
                        <MenuComponent classes='account-menu' menuClasses='flex-column'>
                            {isLoggedIn() ?
                                (<>
                                    <MenuItemComponent to='/profile'>Account</MenuItemComponent>
                                    <MenuItemComponent to='/account/history'>Bestelgeschiedenis</MenuItemComponent>
                                    <MenuItemComponent to='/account/favourites'>Favorieten</MenuItemComponent>
                                    <MenuItemComponent to='/' onClick={() => logOut()}>Uitloggen</MenuItemComponent>
                                </>) :
                                (<>
                                    <MenuItemComponent to='/login'>Inloggen</MenuItemComponent>
                                    <MenuItemComponent to='/register'>Registreren</MenuItemComponent>
                                </>)}
                        </MenuComponent>
                    </div>
                </div>
                <div className='copyright-wrapper'>
                    <p className='copyright'><FontAwesomeIcon icon={faCopyright} /> 2018 DrankReus B.V.</p>
                </div>
            </div>
        </footer>
    )
}