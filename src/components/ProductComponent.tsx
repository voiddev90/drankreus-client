import * as React from 'react'
import { Product, ShoppingCart } from '../model'
import { Link } from 'react-router-dom'
import { withCookies, ReactCookieProps, Cookies } from 'react-cookie'

type Props = {
  product: Product
  onAdd: (productId: number) => void
}

export const ProductComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className="product-container" key={props.product.id}>
      <Link to={{ pathname: `/product/${props.product.id}`, state: props.product }}>
        <h1 className="product-name">{props.product.name}</h1>
        <img src={props.product.url} />
        <p className="product-price">€{props.product.price}</p>
        <p className="product-volume">{props.product.volume} liter</p>
        <p className="product-alcoholpercentage">
          {props.product.alcoholPercentage}%
        </p>
      </Link>
      <button
        className="product-button"
        onClick={() => {
          console.log('geklikt')
          props.onAdd(props.product.id)
        }}
      >
        Toevoegen
      </button>
    </div>
  )
}
