import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Product } from '../../model'
import { checkPropTypes } from 'prop-types'
import { addToCart } from '../../helpers'
import { Link } from 'react-router-dom'

type Props = RouteComponentProps<{ slug: string }> & {
  onAdd: (products: number[]) => void
}

export const ProductDetailComponent: React.SFC<Props> = (value: Props) => {
  const product: Product = value.location.state
  return (
    <section>
      <div className='product-title'>
        <b>{product.name}</b>
      </div>
      <img className='product-image' src={product.url} />
      <div className='product-desr-price'>Prijs: €{product.price},-</div>
      <div className='product-desr-percentage'>
        Alcoholpercentage: {product.alcoholpercentage}%
      </div>
      <p className='product-descr-title'>Product informatie</p>
      <p className='product-description'>{product.description}</p>
      <button
        className='add-to-wishlist'
        onClick={() => value.onAdd([product.id])}
      >
        Voeg toe aan winkelmand
      </button>
      <div className='back-button'>
        <p>
          <Link to='/products' className='back-button'>
            Terug
          </Link>
        </p>
      </div>
    </section>
  )
}
