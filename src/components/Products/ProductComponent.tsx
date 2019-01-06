import * as React from 'react'
import { Product } from '../../model'
import { Link } from 'react-router-dom'
import WishListButtonComponent from '../WishListButtonComponent'

type Props = {
  product: Product
  onAdd: (products: number[]) => void
}

export const ProductComponent: React.SFC<Props> = (props: Props) => {
  return (
    <div className='product-container' key={props.product.id}>
      <Link
        to={{ pathname: `/product/${props.product.id}`, state: props.product }}
      >
        <h1 className='product-name'>{props.product.name}</h1>
        <img src={props.product.url} />
        <p className='product-price'>€{props.product.price.toFixed(2)}</p>
        <p className='product-volume'>{props.product.volume}</p>
        <p className='product-alcoholpercentage'>
          {props.product.alcoholpercentage}%
        </p>
      </Link>
      <button
        className='product-button'
        onClick={() => props.onAdd([props.product.id])}
      >
        Winkelmandje
      </button>
      <WishListButtonComponent product={props.product} />
    </div>
  )
}
