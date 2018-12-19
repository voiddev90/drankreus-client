import * as React from 'react'
import { withCookies, ReactCookieProps } from 'react-cookie'
import { NavLink } from 'react-router-dom'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = ReactCookieProps

const ShoppingCartMenuItemComponent: React.SFC<Props> = (props: Props) => {
  const cookies: number[] = props.cookies.get('shopping-cart') ? props.cookies.get('shopping-cart') : []
  const amountOfCookies = cookies.length
  const liClasses = [
    "menu-item",
    "shoppinger-cart",
    amountOfCookies == 0 ? 'empty' : 'has-content'
  ]
  return (
    <li className={liClasses.join(' ')}>
      <NavLink to="/cart">
        <span className="">{amountOfCookies}</span>
        <FontAwesomeIcon icon={faShoppingCart} size='2x' />
      </NavLink>
    </li>
  )
}

export default withCookies((ShoppingCartMenuItemComponent) as any)
