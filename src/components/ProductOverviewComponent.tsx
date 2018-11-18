import * as React from 'react'
import {
  WithGetState,
  Product,
  Option,
  ProductResponse,
  ShoppingCart
} from '../model'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { ProductComponent } from './ProductComponent'
import { PaginationComponent } from './PaginationComponent'
import { ReactCookieProps, withCookies } from 'react-cookie'

type ProductOverviewProps = ReactCookieProps
type ProductOverviewState = WithGetState<ProductResponse> & {
  perPage: number
  page: number
}

class ProductOverviewComponent extends React.Component<
  ProductOverviewProps,
  ProductOverviewState
> {
  constructor(props: ProductOverviewProps) {
    super(props)

    this.state = {
      type: 'loading',
      perPage: 20,
      page: 0
    }

    this.getData = this.getData.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  getData() {
    Axios.get(
      `http://localhost:5000/api/product/?index=${this.state.page}&size=${
        this.state.perPage
      }`
    )
      .then((value: AxiosResponse<ProductResponse>) => {
        this.setState({
          ...this.state,
          type: 'loaded',
          data: Option(value.data)
        })
      })
      .catch((value: AxiosError) => {
        this.setState({
          ...this.state,
          type: 'error',
          reason: value.response.status
        })
      })
  }

  addToCart(productId: number) {
    if (this.props.cookies.get('shopping-cart')) {
      const shoppingCart: ShoppingCart = this.props.cookies.get('shopping-cart')
      const newShoppingcart: ShoppingCart = shoppingCart.concat([productId])
      this.props.cookies.set('shopping-cart', newShoppingcart)
    } else {
      this.props.cookies.set('shopping-cart', [productId])
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    switch (this.state.type) {
      case 'loaded':
        switch (this.state.data.type) {
          case 'none':
            return <>geen producten</>
          case 'some':
            return (
              <section className="product-overview">
                {this.state.data.value.items.map((value: Product) => {
                  return (
                    <ProductComponent
                      product={value}
                      key={value.id}
                      onAdd={this.addToCart}
                    />
                  )
                })}
                <PaginationComponent
                  totalPages={this.state.data.value.totalPages}
                  route='product'
                  currentPage={this.state.page}
                  onClick={(page: number) => {
                    this.setState({ ...this.state, page: page }, this.getData)
                  }}
                />
              </section>
            )
        }
      case 'loading':
        return <>loading</>
      case 'error':
      default:
        return <>error</>
    }
  }
}

export default withCookies(ProductOverviewComponent)
