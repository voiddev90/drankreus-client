import * as React from 'react'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { WithPostState, Product, getAuthorizedAxiosInstance } from '../model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

type Props = { product: Product }
type State = WithPostState

export default class WishListButtonComponent extends React.Component<
  Props,
  State
  > {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'editing'
    }

    this.addToWishList = this.addToWishList.bind(this)
  }

  addToWishList() {
    console.log('het is gelukt')
    getAuthorizedAxiosInstance().post('wishlists/', { id: this.props.product.id })
      .then((response: AxiosResponse<null>) => {
        this.setState({
          ...this.state,
          type: 'success'
        })

      })
      .catch((error: AxiosError) => {
        this.setState({
          ...this.state,
          type: 'error'
        })
      })

  }

  render() {
    return (
      <a
        href="#"
        onClick={(e) => {
          this.addToWishList()
        }}>
        <FontAwesomeIcon icon={faHeart} />
      </a>
    )
  }
}
