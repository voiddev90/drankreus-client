import * as React from 'react'
import HeaderComponent from './HeaderComponent'
import { FooterComponent } from './FooterComponent';

type Props = {}
type State = {}

export default class BaseComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    render() {
        return (
            <>
                <HeaderComponent />
                <main className="content">
                    {this.props.children}
                </main>
                <FooterComponent />
            </>
        )
    }
}