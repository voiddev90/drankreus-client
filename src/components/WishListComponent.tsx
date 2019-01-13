import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import {
  Product,
  WithGetState,
  Option,
  getAuthorizedAxiosInstance
} from '../model'
import { WishlistResponse } from '../model'
import WishListProductComponent from './WishListProductComponent'
import { ReactCookieProps, withCookies } from 'react-cookie';
import { addToCart } from '../helpers';
import { SideBar } from './UI/SideBar';
import { AccountMenuComponent } from './Menu/AccountMenuComponent';

type WishListOverviewState = WithGetState<WishlistResponse> & {
  perPage: number
  page: number
}
type Props = ReactCookieProps
//onAddtoWishList: (products: number[]) => void

class WishListComponent extends React.Component<
  Props,
  WishListOverviewState
  > {
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
    getAuthorizedAxiosInstance()
      .get(`http://localhost:5000/api/wishlists/`)
      .then((value: AxiosResponse<WishlistResponse>) => {
        this.setState({
          ...this.state,
          type: 'loaded',
          data: Option(value.data)
        })
      })
      .catch((value: AxiosError) => {
        this.setState({
          ...this.state,
          type: 'error'
        })
      })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    document.title = 'Drankreus - Wishlist'
    switch (this.state.type) {
      case 'loading':
        return <>favorietentlijst wordt geladen </>
      case 'error':
        return <>Er ging iets fout</>
      case 'loaded':
        switch (this.state.data.type) {
          case 'none':
            return <>Er staan geen producten in je favorietenlijst.</>
          case 'some':
            return (
              <section className='wishlist container-fluid'>
                <div className='wishlist-inner align-center-vh row'>
                  <div className='wishlist-products col-5'>
                    <h1>Favorieten</h1>
                    <div>
                      {this.state.data.value.map((value: any) => {
                        return (
                          <WishListProductComponent
                            wishId={value.wishId}
                            product={value.product}
                            key={value.product.id}
                            onAdd={addToCart(this.props.cookies)}
                          />
                        )
                      })}
                    </div>
                  </div>
                <SideBar type='blank' size={3} extraClasses={['height', 'account-side-menu-wrapper']}>
                  <AccountMenuComponent />
                </SideBar>
                </div>
              </section>
            )
        }
    }
  }
}

export default withCookies((WishListComponent) as any)