import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Product } from '../../model'
import { checkPropTypes } from 'prop-types'
import { addToCart } from '../../helpers'

type Props = RouteComponentProps<{ slug: string }> & {
  onAdd: (products: number[]) => void
}

export const ProductDetailComponent: React.SFC<Props> = (value: Props) => {
  const product: Product = value.location.state
  return (
    <section>
      <div className='product-title'>{product.name}</div>

      <img className='product-image' src={product.url} />
      <div className='product-price'>€{product.price}</div>
      <div className='product-percentage'>{product.alcoholPercentage}</div>
      <p className='product-description'>{product.description}</p>
      <button
        className='add-to-wishlist'
        onClick={() => value.onAdd([product.id])}
      >
        Voeg toe aan winkelmand
      </button>
    </section>
  )
}
