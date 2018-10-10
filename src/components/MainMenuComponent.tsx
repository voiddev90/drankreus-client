import * as React from 'react'
import MenuItemComponent from './Menu/MenuItemComponent'
import '../css/MainMenu.css'

type Props = {}
type State = {}

export default class MainMenuComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <nav className="main-menu">
                <ul className="menu">
                    <MenuItemComponent to="/" name="Contact" />
                    <MenuItemComponent to="/" name="Klantenservice" />
                    <MenuItemComponent to="/login" name="Inloggen" />
                </ul>
            </nav>
        )
    }
}