import * as React from 'react'
import { ReactCookieProps, withCookies } from 'react-cookie'
import { WithGetState, ProductResponse, Product, Option } from '../model'
import { ShoppingCartItemComponent } from './ShoppingCart/ShoppingCartItemComponent'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import {
  distinct,
  deleteItemFromShoppingCart,
  clearShoppingCart,
  addToCart,
  handleFieldChange
} from '../helpers'
import ShoppingCartRecap from './ShoppingCart/ShoppingCartRecap'
import { Link } from 'react-router-dom';
import { SideBar } from './UI/SideBar';

type State = WithGetState<ProductResponse> & {
  notes: string
}

class ShoppingCartComponent extends React.Component<ReactCookieProps, State> {
  handleFieldChange: <T>(field: string) => (value: T) => void
  constructor(props: ReactCookieProps) {
    super(props)

    this.state = {
      type: 'loading',
      notes: ''
    }

    this.handleFieldChange = handleFieldChange.bind(this)
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
            ...this.state,
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
        ...this.state,
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
      <section className='shopping-cart container-fluid'>
        <div className='shopping-cart-inner row'>
          <div className='cart-items col-8'>
            <h1 className='page-title'>Winkelmand</h1>
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
                      <table className='shopping-cart-table'>
                        <tr>
                          <th className='product' colSpan={5}>Product</th>
                          <th className='price'>Prijs</th>
                          <th className='amount' colSpan={2}>Aantal</th>
                        </tr>
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
                            />
                          ))}
                      </table>
                    )
                  )}
            <div className='cart-controls'>
              <p>
                <button
                  disabled={!shoppingCart || shoppingCart.length == 0}
                  type='button'
                  onClick={() => clearShoppingCart(this.props.cookies)}
                  className='btn btn-outline-primary btn-sm'
                >
                  Leegmaken
                  </button>
              </p>
            </div>
          </div>
          <SideBar type='blank' size={4} >
            <ShoppingCartRecap />
            <form>
              <p><textarea placeholder='Opmerkingen' value={this.state.notes} onChange={e => this.handleFieldChange('notes')(e.target.value)} /></p>
            </form>
            <div className='order-button'><p><Link to='/checkout/order' className="btn btn-primary btn-sm" type='button'>Bestellen</Link></p></div>
          </SideBar>
        </div>
      </section>
    )
  }
}

//export default withCookies(ShoppingCartComponent)
export default withCookies((ShoppingCartComponent) as any)
