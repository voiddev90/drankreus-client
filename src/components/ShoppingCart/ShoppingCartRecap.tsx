import * as React from 'react'
import {
  WithGetState,
  CartResponse,
  ShoppingCart,
  Product,
  Option
} from '../../model'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { distinct } from '../../helpers'
import { withCookies, ReactCookieProps } from 'react-cookie'

type Props = ReactCookieProps

type State = WithGetState<CartResponse>

class ShoppingCartRecap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'loading'
    }

    this.props.cookies.addChangeListener(options => {
      if (options.name == 'shopping-cart') {
        this.getData()
      }
    })

    this.getData = this.getData.bind(this)
  }

  getData() {
    const shoppingCart: ShoppingCart = this.props.cookies.get('shopping-cart')
    if (shoppingCart && shoppingCart.length > 0) {
      const requestBody = shoppingCart.filter(distinct).map(productId => {
        return {
          id: productId,
          amount: shoppingCart.filter(product => product == productId).length
        }
      })

      Axios.post('http://localhost:5000/api/cart', requestBody)
        .then((response: AxiosResponse<CartResponse>) => {
          console.log(response.data)
          this.setState({ type: 'loaded', data: Option(response.data) })
        })
        .catch((error: AxiosError) =>
          this.setState({ type: 'error', reason: error.response.status })
        )
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const shoppingCart: ShoppingCart = this.props.cookies.get('shopping-cart')
    return shoppingCart && shoppingCart.length > 0 ? (
      <div className='recap'>
        <p className='tax'>
          BTW (21%): €
          {this.state.type == 'loading' ? (
            <>BTW ophalen..</>
          ) : (
              this.state.type == 'loaded' &&
              this.state.data.type == 'some' &&
              this.state.data.value.tax.toFixed(2)
            )}
        </p>
        <p className='total'>
          Totaal: €
          {this.state.type == 'loading' ? (
            <>Totaal ophalen..</>
          ) : (
              this.state.type == 'loaded' &&
              this.state.data.type == 'some' &&
              this.state.data.value.grandTotal.toFixed(2)
            )}
        </p>
      </div>
    ) : null
  }
}

export default withCookies((ShoppingCartRecap) as any)
