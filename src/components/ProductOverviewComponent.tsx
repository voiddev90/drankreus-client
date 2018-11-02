import * as React from 'react'
import {
  WithGetState,
  Page,
  Product,
  Filter,
  Option,
  Tag,
  ProductResponse
} from '../model'
import Axios, { AxiosResponse, AxiosError } from 'axios'

type ProductOverviewProps = {}
type ProductOverviewState = WithGetState<ProductResponse> & {
  perPage: number
  page: number
}

export default class ProductOverviewComponent extends React.Component<
  ProductOverviewProps,
  ProductOverviewState
> {
  constructor(props: ProductOverviewProps) {
    super(props)

    this.state = {
      type: 'loading',
      perPage: 20,
      page: 1
    }
  }

  componentDidMount() {
    Axios.get(`http://localhost:5000/api/product/products?index=${this.state.page}&size=${this.state.perPage}`)
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
                    <div className="product-container">
                      <h1 className="product-name">{value.name}</h1>
                      <p className="product-price">€{value.price}</p>
                      <p className="product-volume">{value.volume} liter</p>
                      <p className="product-alcoholpercentage">
                        {value.alcoholPercentage}%
                      </p>
                    </div>
                  )
                })}
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
