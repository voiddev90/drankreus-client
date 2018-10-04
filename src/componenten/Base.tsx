import * as React from 'react'

type Props = {}
type State = {}

export default class Base extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    render() {
        return (
            <>
                <section className="content">
                    {this.props.children}
                </section>
            </>
        )
    }
}