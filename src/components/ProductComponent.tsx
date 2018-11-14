import * as React from 'react'
import { Product } from '../model';

type Props = Product
type State = {}

export default class ProductComponent extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
    }

    render(){
        return (
            <div className="productcontainer" id="productcontainer">
            <ul>
                <li><img src={this.props.url}></img></li>
                <li><h1 id="productname">{this.props.name}</h1></li>
                <li><h1 id="productprice">{this.props.price}</h1></li>
                

            </ul>
            </div>
        )
    }
}