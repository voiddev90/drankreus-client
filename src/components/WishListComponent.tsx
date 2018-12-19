import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { Product, WithGetState, Option } from '../model'
import { ProductResponse } from '../model'
import WishListProductComponent from './WishListProductComponent'


type WishListOverviewState = WithGetState<ProductResponse> & {
  perPage: number
  page: number
}
type Props = {
}
//onAddtoWishList: (products: number[]) => void

export default class WishListComponent extends React.Component<Props, WishListOverviewState> {
  constructor(props: Props) {
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
      `http://localhost:5000/api/wishlist/`
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


  render() {
    document.title = 'Drankreus - Wishlist'
    switch (this.state.type) {
      case 'loaded':
        switch (this.state.data.type) {
          case 'none':
            return <>Er staan geen producten in je favorieten lijst.</>
          case 'some':
    return (
      <div className='Wishlist'>
        <h1 className='WistList_text'>Dit is uw wenslijst</h1>
        <div>
        {this.state.data.value.items.map((value: Product) => {
                  return ( 
                    <WishListProductComponent product={value} />
                  )})}
        </div>
      </div>
    )
  }}}}

// export const WishListComponentProps: React.SFC<Props> = (props: Props) => {
//   switch (props.match.params.slug) {
//     case 'favourites':
//       return <>Geschiedenis</>
//   }
// }
