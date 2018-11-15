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
import '../css/productGrid.css'
import { Link } from 'react-router-dom';
import { ProductComponent } from './ProductComponent';
import { PaginationComponent } from './PaginationComponent';

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

    this.GetData = this.GetData.bind(this)
  }

  GetData() {
    Axios.get(`http://localhost:5000/api/product/?index=${this.state.page}&size=${this.state.perPage}`)
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
    this.GetData()
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
                  return <ProductComponent {...value} />
                })}
                <PaginationComponent totalPages={this.state.data.value.totalPages} route="product" onClick={(page: number) => {
                  this.setState({...this.state, page: page}, this.GetData)
                  }} />
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
