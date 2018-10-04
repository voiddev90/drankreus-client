import * as React from 'react'
import MenuItemComponent from './Menu/MenuItemComponent';

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
                </ul>
            </nav>
        )
    }
}