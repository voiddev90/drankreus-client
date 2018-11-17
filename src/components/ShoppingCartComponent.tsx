import * as React from 'react'
import { ReactCookieProps, withCookies, Cookies } from 'react-cookie'

const clearShoppingCart: (cookies: Cookies) => void = cookies => {
  cookies.remove('shopping-cart')
}

const ShoppingCartComponent: React.SFC<ReactCookieProps> = (
  props: ReactCookieProps
) => {
  return (
    <section className="shopping-cart">
      <h1>Winkelmand</h1>
      <button
        disabled={!props.cookies.get('shopping-cart')}
        type="button"
        onClick={() => clearShoppingCart(props.cookies)}
      >
        Leegmaken
      </button>
    </section>
  )
}

export default withCookies(ShoppingCartComponent)
