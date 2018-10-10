import * as React from 'react'

type Props = {}
type State = {}

export default class NotFoundComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    render(){
        return (
            <div className="404-not-found">
                <h1 className="post-title">Is de drank nu al op?</h1>
                <p className="404-text">Sorry, de pagina die je zoekt kunnen wij niet (meer) vinden. Misschien helpt <label htmlFor="search">zoeken</label>?</p>
            </div>
        )
    }
}