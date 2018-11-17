import * as React from 'react'
import { Product } from '../model'
import { Link } from 'react-router-dom'

type Props = Product

export const ProductComponent: React.SFC<Props> = (value: Props) => {
  document.title = 'DrankReus'
  return (
    <div className="product-container" key={value.id}>
      <Link to={`/product/${value.id}`}>
        <h1 className="product-name">{value.name}</h1>
        <img src={value.url} />
        <p className="product-price">€{value.price}</p>
        <p className="product-volume">{value.volume} liter</p>
        <p className="product-alcoholpercentage">{value.alcoholPercentage}%</p>
      </Link>
      <button className="product-button">Toevoegen</button>
    </div>
  )
}
