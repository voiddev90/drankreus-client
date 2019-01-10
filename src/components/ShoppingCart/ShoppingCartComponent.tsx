import * as React from 'react'
import { ReactCookieProps, withCookies } from 'react-cookie'
import { WithGetState, ProductResponse, Product, Option } from '../../model'
import { ShoppingCartItemComponent } from './ShoppingCartItemComponent'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import {
  distinct,
  deleteItemFromShoppingCart,
  clearShoppingCart,
  addToCart
} from '../../helpers'
import ShoppingCartRecap from './ShoppingCartRecap'
import { Link } from 'react-router-dom';

type State = WithGetState<ProductResponse>

class ShoppingCartComponent extends React.Component<ReactCookieProps, State> {
  constructor(props: ReactCookieProps) {
    super(props)

    this.state = {
      type: 'loading'
    }
  }

  componentDidMount() {
    const shoppingCart: number[] = this.props.cookies.get('shopping-cart')
    if (shoppingCart) {
      const url: string = shoppingCart
        .filter(distinct)
        .map((productId: number) => `products=${productId}`)
        .join('&')
      Axios.get(`http://localhost:5000/api/product/?index=0&size=100&${url}`)
        .then((value: AxiosResponse<ProductResponse>) => {
          this.setState({
            type: 'loaded',
            data: Option(value.data)
          })
        })
        .catch((error: AxiosError) => {
          this.setState({
            type: 'error'
          })
        })
    } else {
      this.setState({
        type: 'loaded',
        data: {
          type: 'some',
          value: {
            index: 0,
            size: 100,
            items: []
          }
        }
      })
    }
  }

  render() {
    const shoppingCart: number[] = this.props.cookies.get('shopping-cart')
    return (
      <section className='shopping-cart'>
        <h1>Winkelmand</h1>
        <div className='cart-items'>
          {this.state.type == 'loading' ? (
            <>Loading</>
          ) : this.state.type == 'error' ? (
            <>Error</>
          ) : !shoppingCart ||
            shoppingCart.length == 0 ||
            this.state.data.type == 'none' ? (
            <>Winkelmandje is leeg</>
          ) : (
            this.state.data.type == 'some' &&
            this.state.data.value && (
              <>
                {this.state.data.value.items
                  .filter(
                    (product: Product) => shoppingCart.indexOf(product.id) != -1
                  )
                  .map((product: Product) => (
                    <ShoppingCartItemComponent
                      {...product}
                      key={product.id}
                      amount={
                        shoppingCart.filter(value => value == product.id).length
                      }
                      onDel={deleteItemFromShoppingCart(this.props.cookies)}
                      onAdd={addToCart(this.props.cookies)}
                      allowEdits={true}
                    />
                  ))}
              </>
            )
          )}
        </div>
        <div className='cart-controls'>
          <p>
            <button
              disabled={!shoppingCart || shoppingCart.length == 0}
              type='button'
              onClick={() => clearShoppingCart(this.props.cookies)}
            >
              Leegmaken
            </button>
          </p>
        </div>
        <ShoppingCartRecap />
        <div className='order-button'><p><Link to='/checkout/order' className="button">Bestellen</Link></p></div>
      </section>
    )
  }
}

export default withCookies((ShoppingCartComponent) as any)
