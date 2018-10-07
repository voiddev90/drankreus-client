import * as React from 'react'
import { NavLink } from 'react-router-dom';

type Props = {
    name: string
    to: string
}
type State = {}

export default class MenuItemComponent extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
    }

    render() {
        return (
            <li className="menu-item"><NavLink to={this.props.to}>{this.props.name}</NavLink></li>
        )
    }
}