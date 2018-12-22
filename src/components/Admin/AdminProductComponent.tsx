import * as React from 'react'
import {
  Product,
  WithDeleteState,
  getAuthorizedAxiosInstance
} from '../../model'
import { Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

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
      type: 'loading'
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
      <article className={`product ${this.state.type}`}>
        <header className='product-header'>
          <img src={this.props.product.url} />
        </header>
        <main className='product-content'>
          <div className='product-name'>{this.props.product.name}</div>
          <div className='product-stock'>1000</div>
          <div className='product-delete'>
            <Button onClick={() => this.deleteProduct()}>{this.state.type != 'loading' ? <FontAwesomeIcon icon={faTrash} /> : <FontAwesomeIcon icon={faSpinner} />}</Button>
          </div>
        </main>
      </article>
    ) : (
      <article className='product removed'>
        <main className='product-content'>
          <div className='product-state'>Artikel verwijderd</div>
        </main>
      </article>
    )
  }
}
