import * as React from 'react'
import {
  WithGetState,
  CartResponse,
  ShoppingCart,
  Product,
  Option,
  getAuthorizedAxiosInstance
} from '../../model'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { distinct, isLoggedIn } from '../../helpers'
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
      if(isLoggedIn())
      {
        console.log("IK BEN INGELOGD!")
        getAuthorizedAxiosInstance().post('http://localhost:5000/api/cart', requestBody)
        .then((response: AxiosResponse<CartResponse>) => {
          console.log(response.data)
          this.setState({ type: 'loaded', data: Option(response.data) })
        })
        .catch((error: AxiosError) =>
          this.setState({ type: 'error', reason: error.response.status })
        )
      }
      else
      {
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
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const shoppingCart: ShoppingCart = this.props.cookies.get('shopping-cart')
    return shoppingCart && shoppingCart.length > 0 ? (
      <div className='recap'>
        <table>
          <tr>
            <th>Incl. BTW (21 %)</th>
            <td>{this.state.type == 'loading' ? (
              <>BTW ophalen..</>
            ) : (
                this.state.type == 'loaded' &&
                this.state.data.type == 'some' &&
                `€ ${this.state.data.value.tax.toFixed(2)}`
              )}</td>
          </tr>
          <tr>
            <th>Verzendkosten</th>
            <td>Gratis</td>
          </tr>
          <tr>
            <th>Korting</th>
            <td>{this.state.type == 'loading' ? <>Korting aan het ophalen..</> : this.state.type == 'error' ? <>Fout bij het ophalen van de korting</> : this.state.data.type == 'some' ? <>€ {this.state.data.value.discountAmount.toFixed(2)}</> : <>Geen korting</>}</td>
          </tr>
          <tr>
            <th>Totaal</th>
            <td>{this.state.type == 'loading' ? (
              <>Totaal ophalen..</>
            ) : (

                this.state.type == 'loaded' &&
                this.state.data.type == 'some' &&
                `€ ${this.state.data.value.grandTotal.toFixed(2)}`
              )}</td>
          </tr>
        </table>
      </div>
    ) : null
  }
}

export default withCookies((ShoppingCartRecap) as any)
