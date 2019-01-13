import * as React from 'react'
import { Product } from '../../model'
import { Link } from 'react-router-dom'
import WishListButtonComponent from '../WishListButtonComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

type Props = {
  product: Product
  onAdd: (products: number[]) => void
  className?: string
}

export const ProductComponent: React.SFC<Props> = (props: Props) => {
  return (
    <article className={`product col-4 ${props.className && props.className}`} key={props.product.id}>
      <header className='product-image-wrapper'>
        <img src={props.product.url} className='product-image' />
      </header>
      <main className='product-info-wrapper'>
        <h4>
          <Link
            to={{ pathname: `/product/${props.product.id}`, state: props.product }}
          >
            {props.product.name}
          </Link>
        </h4>
        <div className='product-info row'>
          <p className='product-info-item volume col'>
            <Link
              to={{ pathname: `/product/${props.product.id}`, state: props.product }}
            >
              {props.product.volume}
            </Link>
          </p>
          <p className='product-info-item alcoholpercentage col'>
            <Link
              to={{ pathname: `/product/${props.product.id}`, state: props.product }}
            >
              {props.product.alcoholpercentage}%
            </Link>
          </p>
          <p className='product-info-item price col'>
            <Link
              to={{ pathname: `/product/${props.product.id}`, state: props.product }}
            >
              € {props.product.price.toFixed(2)}
            </Link>
          </p>
          <div className='product-info-item add-to-cart col'>
            <button
              className="btn btn-sm btn-square btn-outline-white"
              onClick={() => props.onAdd([props.product.id])}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
          <div className='product-info-item wishlist col'><WishListButtonComponent product={props.product} /></div>
        </div>
      </main>
    </article>
  )
}
