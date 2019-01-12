import * as React from 'react'
import { OrderProduct , WithGetState , Option, Order, Product } from '../model';
import Axios, { AxiosResponse, AxiosError } from 'axios';

type Props = {
  orderProduct: OrderProduct
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
          <img src={this.props.orderProduct.product.url}></img>
          <h1>{this.props.orderProduct.product.name}</h1>
          <p>{this.props.orderProduct.product.alcoholpercentage}%</p>
          <p>€{this.props.orderProduct.product.price}</p>         
        </div>
      )
    }
}
