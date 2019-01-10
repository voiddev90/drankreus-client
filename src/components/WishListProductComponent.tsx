import * as React from 'react'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { WithDeleteState, Product, ProductResponse, Option, getAuthorizedAxiosInstance } from '../model'
import { Link } from 'react-router-dom';

type Props = {
    product: Product,
    wishId: number
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
        getAuthorizedAxiosInstance().delete(`http://localhost:5000/api/wishlists/${this.props.wishId}`)
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
        console.log(this.props.wishId);
        return (
            <div>
                <Link to={`/product/${this.props.product.id}`}>
                <img src={this.props.product.url}></img> 
                <div className='wishlist-product-name'>{this.props.product.name}</div>
                <div className='wishlist-product-price'>€{this.props.product.price}</div>
                <div className='wishlist-product-percentage'>%{this.props.product.alcoholpercentage}</div>
                <div className='wishlist-product-volume'>{this.props.product.volume}</div>
                </Link>
                <button className='wishlist-delete-button' onClick={() => this.DeleteFromWishList()}>Verwijder uit favorieten</button>
            </div>
        )
    }
}