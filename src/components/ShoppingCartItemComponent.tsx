import * as React from 'react'
import { Product } from '../model'

type Props = Product & { amount: number, onDel: (productId: number) => void }

export const ShoppingCartItemComponent: React.SFC<Props> = (
  props: Props
) => {
  return (
    <article className="cart-item">
      <header className="image-wrapper">
        <img src={props.url} />
      </header>
      <main className="content">
        <h5 className="title">{props.name}</h5>
        <p>€{props.price}</p>
        <p>Aantal: {props.amount}</p>
        <p>Totaal: €{props.price * props.amount}</p>
        <button type='button' onClick={() => props.onDel(props.id)}>Verwijderen</button>
      </main>
    </article>
  )
}
