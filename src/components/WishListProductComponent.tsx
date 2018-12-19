import * as React from 'react'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { WithDeleteState, Product, ProductResponse, Option } from '../model'
import { Link } from 'react-router-dom';

type Props = {
    product: Product
}
type State = WithDeleteState<Product>

export default class WishListProductComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        
        this.state = {
            type: 'loaded',
            data: Option(this.props.product)
        }
        this.DeleteFromWishList = this.DeleteFromWishList.bind(this)
    }
    DeleteFromWishList() {
        this.setState(
            {
                ...this.state, type: 'loading'
            }
        )
        Axios.delete(`http://localhost:5000/api/wishlist/${this.props.product.id}`)
          .then((response: AxiosResponse<ProductResponse>) => {
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

    render(){
        return (
            <div>
                <Link to={`/product/${this.props.product.id}`}>
                <img className='wishlist-product-image'>{this.props.product.url}</img>
                <p className='wishlist-product-name'>{this.props.product.name}</p>
                <p className='wishlist-product-price'>{this.props.product.price}</p>
                <div className='wishlist-delete-button' onClick={() => this.DeleteFromWishList()}>Verwijder uit favorieten</div>
                </Link>
            </div>
        )
    }
}