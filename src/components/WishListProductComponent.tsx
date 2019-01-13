import * as React from 'react'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { WithDeleteState, Product, ProductResponse, Option, getAuthorizedAxiosInstance } from '../model'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

type Props = {
    product: Product
    wishId: number
    onAdd: (products: number[]) => void
}
type State = WithDeleteState<Product>

export default class WishListProductComponent extends React.Component<Props, State>{
    constructor(props: Props) {
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

    render() {
        const props = this.props
        return (
            <article className={`product col-8`} key={props.product.id}>
                <header className='product-image-wrapper'>
                    <img src={props.product.url} className='product-image' />
                </header>
                <main className='product-info-wrapper'>
                    <h4>
                        <Link
                            to={{ pathname: `/product/${props.product.id}`, state: props.product }}
                        >
                            {props.product.name}
                        </Link>
                    </h4>
                    <div className='product-info row'>
                        <p className='product-info-item volume col'>
                            <Link
                                to={{ pathname: `/product/${props.product.id}`, state: props.product }}
                            >
                                {props.product.volume}
                            </Link>
                        </p>
                        <p className='product-info-item alcoholpercentage col'>
                            <Link
                                to={{ pathname: `/product/${props.product.id}`, state: props.product }}
                            >
                                {props.product.alcoholpercentage}%
                            </Link>
                        </p>
                        <p className='product-info-item price col'>
                            <Link
                                to={{ pathname: `/product/${props.product.id}`, state: props.product }}
                            >
                                € {props.product.price}
                            </Link>
                        </p>
                        <div className='product-info-item add-to-cart col'>
                            <button
                                className="btn btn-sm btn-square btn-outline-white"
                                onClick={() => props.onAdd([props.product.id])}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </button>
                        </div>
                        <div className='product-info-item wishlist col'><a
                            href="#"
                            onClick={(e) => {
                                this.DeleteFromWishList()
                            }}>
                            <FontAwesomeIcon icon={faHeart} />
                        </a></div>
                    </div>
                </main>
            </article>
        )
    }
}