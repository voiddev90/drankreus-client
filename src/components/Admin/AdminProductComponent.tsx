import * as React from 'react'
import { Product } from '../../model';

type Props = {
  product: Product
}

export const AdminProductComponent: React.SFC<Props> = (props: Props) => {
  return (
    <article className='product'>
      <header className='product-header'>
        <img src={props.product.url} />
      </header>
      <main className='product-content'>
        <div className='product-name'>{props.product.name}</div>
        <div className='product-stock'>1000</div>
      </main>
    </article>
  )
}