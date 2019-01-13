import * as React from 'react'
import { RouteProps } from 'react-router';
import ProductOverviewComponent from './ProductOverviewComponent';
import Axios, { AxiosResponse, AxiosError } from 'axios';
import {
  WithGetState,
  Product,
  Option,
  ProductResponse
} from '../model'
import { ProductComponent } from './Products/ProductComponent';
import { PaginationComponent } from './PaginationComponent';
import { addToCart } from '../helpers'
import { ReactCookieProps } from 'react-cookie';
import { Loader } from './Loader';

type Props = ReactCookieProps & RouteProps & {
}
type State = WithGetState<ProductResponse> & {
  perPage: number
  page: number
  search: string
}

export default class SearchOverviewComponent extends React.Component<Props,State>{
    constructor(props: RouteProps){
        super(props)
        this.state ={
            type: 'loading',
            perPage: 20,
            page: 0,
            search: "",
        }
    this.getData = this.getData.bind(this)
    }
    componentDidMount(){
        this.getData()
    }
    componentWillReceiveProps(){
      this.getData()
    }
    getData(){
        Axios
        .get(`http://localhost:5000/api/product/Search/?Products=${this.props.location.state.test}&index=${this.state.page}&size=${
        this.state.perPage}`
        )
        .then((value: AxiosResponse<ProductResponse>) =>{
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
    render(){
    switch (this.state.type) {
      case 'loaded':
        switch (this.state.data.type) {
          case 'none':
          return <Loader />
          case 'some':
            return (
              <section className='product-overview container-fluid'>
              <section className='product-overview-inner row'>
              <div className="products-wrapper col-9">
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
              </section>
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