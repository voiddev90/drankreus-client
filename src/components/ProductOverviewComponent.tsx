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
import FilterComponent from './Filtercomponent';
import { Select } from '@material-ui/core';
type ProductOverviewProps = ReactCookieProps & {
}
type ProductOverviewState = WithGetState<ProductResponse> & {
  perPage: number
  page: number
  query: string
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
      page: 0,
      query: ''
    }
    this.getData = this.getData.bind(this)
    this.getString = this.getString.bind(this)
  }

  getData() {
    Axios.get(`http://localhost:5000/api/product/?${this.state.query}index=${this.state.page}&size=${
      this.state.perPage}`
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
  getString(e: string) {
    this.setState({
      query: e
    }, this.getData)
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    switch (this.state.type) {
      case 'loaded':
        switch (this.state.data.type) {
          case 'none':
            return <>Er zijn geen producten gevonden.</>
          case 'some':
            return (
              <section className='product-overview container-fluid'>
                <div className='product-overview-inner row'>
                  <div className='filter col-3'><FilterComponent getQueryString={this.getString} /></div>
                  <div className='products-wrapper col-9'>
                    <PaginationComponent
                      totalPages={this.state.data.value.totalPages}
                      route='product'
                      currentPage={this.state.page}
                      onClick={(page: number) => {
                        this.setState({ ...this.state, page: page }, this.getData)
                      }}
                    />
                    <div className='products row'>
                      {this.state.data.value.items.map((value: Product) => {
                        return (
                          <ProductComponent
                            product={value}
                            key={value.id}
                            onAdd={addToCart(this.props.cookies)}
                          />
                        )
                      })}
                    </div>
                    <PaginationComponent
                      totalPages={this.state.data.value.totalPages}
                      route='product'
                      currentPage={this.state.page}
                      onClick={(page: number) => {
                        this.setState({ ...this.state, page: page }, this.getData)
                      }}
                    />
                  </div>
                </div>
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

export default withCookies((ProductOverviewComponent) as any)
