import * as React from 'react'
import {
  Product,
  WithDeleteState,
  getAuthorizedAxiosInstance
} from '../../../model'
import { Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

type Props = {
  product: Product
}

type State = WithDeleteState<Product>

export default class AdminProductComponent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'loaded',
      data: {
        type: 'some',
        value: this.props.product
      }
    }
  }

  deleteProduct() {
    this.setState({
      type: 'removing'
    })
    getAuthorizedAxiosInstance()
      .delete(`product/${this.props.product.id}`)
      .then(response => {
        this.setState({
          type: 'success'
        })
      })
      .catch(response => {
        this.setState({
          type: 'error'
        })
      })
  }

  render() {
    return this.state.type != 'success' ? (
      <article className={`product product-${this.state.type}`}>
        <header className='product-header'>
          <Link
            to={{
              pathname: `/admin/products/${this.props.product.id}`,
              state: this.props.product
            }}
          >
            <img src={this.props.product.url} />
          </Link>
        </header>
        <main className='product-content'>
          <div className='product-name'>
            <Link
              to={{
                pathname: `/admin/products/${this.props.product.id}`,
                state: this.props.product
              }}
            >
              {this.props.product.name}
            </Link>
          </div>
          <div className='product-stock'>1000</div>
          <div className='product-delete'>
            <Button onClick={() => this.deleteProduct()}>
              {this.state.type != 'removing' ? (
                <FontAwesomeIcon icon={faTrash} />
              ) : (
                <FontAwesomeIcon icon={faSpinner} spin />
              )}
            </Button>
          </div>
        </main>
      </article>
    ) : (
      <article className='product removed'>
        <main className='product-content'>
          <div className='product-state'>Artikel uit de schappen gehaald</div>
        </main>
      </article>
    )
  }
}
