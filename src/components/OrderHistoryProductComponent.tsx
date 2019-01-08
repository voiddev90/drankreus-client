import * as React from 'react'
import { OrderProduct , WithGetState , Option, Order, Product } from '../model';
import Axios, { AxiosResponse, AxiosError } from 'axios';

type Props = {
  orderproducts: OrderProduct
  product: Product
}
type ProductOverviewState = WithGetState<OrderProduct>

export class OrderHistoryProductComponent extends React.Component<Props, ProductOverviewState>{
    constructor(props: Props){
        super(props)

        this.state = {
            type: 'loading'
        }

    }

    render() {
      return (
        <div>
          <img src={this.props.orderproducts.product.url}></img>
          <h1>{this.props.orderproducts.product.name}</h1>
          <p>{this.props.orderproducts.product.alcoholpercentage}</p>
          <p>{this.props.orderproducts.product.price}</p>         
        </div>
      )
    }
}
