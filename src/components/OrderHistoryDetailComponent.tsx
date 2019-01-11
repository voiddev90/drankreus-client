import * as React from 'react'
import { Order, OrderProduct } from '../model'
import { Link } from 'react-router-dom'
import { OrderHistoryProductComponent } from './OrderHistoryProductComponent'

type Props = {
  order: Order
  orderProduct: OrderProduct[]
}


export const OrderHistoryDetailComponent: React.SFC<Props> = (props: Props) => {
  return (
    <section>
    <div className="order-container" key={props.order.id}>
        <p className="order-name">Hieronder is een overzicht te zien van de orders met daarin producten die je in het verleden via onze webshop hebt besteld.</p>
        {props.orderProduct.map((value: OrderProduct) => {
                  return (
                    <OrderHistoryProductComponent
                    orderProduct={value}
                    key={value.id}
                    product={value.product}
                    
                    
                    />
                  )
                })}
    </div>
    </section>
  )
}
