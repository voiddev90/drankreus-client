import * as React from 'react'

type Props = {}
type State = {}

export default class ProductComponent extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
    }

    render(){
        return (
            <div className="productcontainer" id="productcontainer">
            <ul>
                <li><img src={this.props.image}></img></li>
                <li><h1 id="productbrand">{this.props.brand}</h1></li>
                <li><h1 id="productname">{this.props.name}</h1></li>
                <li><h1 id="productprice">{this.props.price}</h1></li>
                <button>Bekijk product</button>

            </ul>
            </div>
        )
    }
}