import * as React from 'react'
import {
  WithGetState,
  Product,
  Option,
  ProductResponse
} from '../model'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { ProductComponent } from './Products/ProductComponent'
import { PaginationComponent } from './PaginationComponent'
import { ReactCookieProps, withCookies } from 'react-cookie'
import { addToCart } from '../helpers'

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
              <section className='product-overview'>
                {this.state.data.value.items.map((value: Product) => {
                  return (
                    <ProductComponent
                      product={value}
                      key={value.id}
                      onAdd={addToCart(this.props.cookies)}
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
