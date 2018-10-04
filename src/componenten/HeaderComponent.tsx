import * as React from 'react'

type Props = {}
type State = {}

export default class HeaderComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    render() {
        return (
            <header className="site-header" />
        )
    }
}