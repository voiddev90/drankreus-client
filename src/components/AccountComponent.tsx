import * as React from 'react'

type Props = {}
type State = {}

export default class BaseComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }
        
    render() {
        document.title = 'DrankReus - Account'
        return (
            <section className="account">
                <div className="user-info">
                    <img></img>
                    <p className="user-name"></p>
                    <p className="user-mail"></p>
                    <p className="user-"></p>
                </div>
                <div className="account-menu">
                    <button className="go-to-cart">Winkelwagen</button>
                    <button className="go-to-wishlist">Favorieten</button>
                    <button className="go-to-history">Geschiedenis</button>
                    <button className="go-to-points">Punten</button>
                </div>
            </section>
            
        )
    }
}