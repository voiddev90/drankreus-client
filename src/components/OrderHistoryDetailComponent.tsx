import * as React from 'react'
import { Order, OrderProduct } from '../model'
import { Link } from 'react-router-dom'
import { OrderHistoryProductComponent } from './OrderHistoryProductComponent'

type Props = {
  order: Order
  orderproducts: OrderProduct[]
}


export const OrderHistoryDetailComponent: React.SFC<Props> = (props: Props) => {
  return (
    <section>
    <div className="order-container" key={props.order.id}>
        <h1 className="order-name">Order #{props.order.id}</h1>
        {this.state.data.value.items.map((value: OrderProduct) => {
                  return (
                    <OrderHistoryProductComponent
                    orderproducts={value}
                    key={value.id}
                    product={value.product}
                    
                    
                    />
                  )
                })}
    </div>
    </section>
  )
}
