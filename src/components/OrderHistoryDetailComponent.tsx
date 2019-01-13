import * as React from 'react'
import { Order, OrderProduct } from '../model'
import { Link } from 'react-router-dom'
import { OrderHistoryProductComponent } from './OrderHistoryProductComponent'
import { ShoppingCartItemComponent } from './ShoppingCart/ShoppingCartItemComponent';

type Props = {
  order: Order
  orderProduct: OrderProduct[]
}


export const OrderHistoryDetailComponent: React.SFC<Props> = (props: Props) => {
  const orderdate: Date = new Date((props.order.orderDate))
  console.log(props.order.orderDate)
  console.log(orderdate)
  return (
    <tbody className='order-history-item'>
      {props.orderProduct.map((value: OrderProduct) => {
        return (
          <ShoppingCartItemComponent {...value.product} key={value.productid} amount={value.amount} checkout={true} />
        )
      })}
      <tr className='date'>
        <th>Datum</th>
        <td colSpan={6}>{orderdate.toLocaleDateString('nl')}</td>
      </tr>
    </tbody>
  )
}
