import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Product } from '../../model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { handleFieldChange, fillArray } from '../../helpers';

type Props = RouteComponentProps<{ slug: string }> & {
  onAdd: (products: number[]) => void
}

type State = {
  descriptionShowMore: boolean
  amountToAdd: number
}

export class ProductDetailComponent extends React.Component<Props, State> {
  handleFieldChange: <T>(field: string) => (value: T) => void

  constructor(props: Props) {
    super(props)

    this.state = {
      descriptionShowMore: false,
      amountToAdd: 1
    }

    this.handleFieldChange = handleFieldChange.bind(this)
    this.toggleShowMore = this.toggleShowMore.bind(this)
  }

  toggleShowMore() {
    this.setState({ ...this.state, descriptionShowMore: !this.state.descriptionShowMore })
  }

  render() {
    const product: Product = this.props.location.state
    return (
      <section className='product-detail container-fluid'>
        <div className='product-detail-inner'>
          <header className='product-header row'>
            <div className='product-image-wrapper col-5'>
              <img className='product-image' src={product.url} />
            </div>
            <div className='product-info col-7'>
              <h1 className='product-title'>{product.name}</h1>
              <h4 className='product-subtitle product-volume'>{product.volume}</h4>
              <div className='product-cart-wrapper'>
                <h3 className='product-price item'>€ {product.price}</h3>
                <div className='amount-form-wrapper item'>
                  <form className='amount-form'>
                    <input className='amount' type='number' value={this.state.amountToAdd} onChange={(e) => {
                      if (parseInt(e.target.value) > 0) {
                        this.handleFieldChange('amountToAdd')(parseInt(e.target.value))
                      }
                    }} />
                  </form>
                </div>
                <div className='product-add-to-cart-button-wrapper item'>
                  <button type='submit' className='btn btn-sm btn-primary' onClick={() => {
                    this.props.onAdd(fillArray(this.state.amountToAdd)(product.id))
                    this.setState({ ...this.state, amountToAdd: 1 })
                  }}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Toevoegen
                  </button>
                </div>
              </div>
            <div className='order-info'>
              <p className='stock item'>Op voorraad</p>
              <p className='delivery-time item'>Voor 21:00 uur besteld, morgen in huis</p>
            </div>
            </div>
          </header>
          <main className='product-content row'>
            <div className='product-content-section description col-7'>
              <h3 className='section-title'>Omschrijving</h3>
              <p className='product-description'>{this.state.descriptionShowMore ? product.description : `${product.description.substr(0, 300)}...`}</p>
              <p><a href="#" onClick={(e) => {
                e.preventDefault()
                this.toggleShowMore()
              }} className='read-more'>{this.state.descriptionShowMore ? 'Lees minder' : 'Lees meer'}</a></p>
            </div>
            <div className='product-content-section details col-5'>
              <h3 className='section-title'>Details</h3>
              <table className='product-details'>
                <tr>
                  <th>Volume</th>
                  <td>{product.volume}</td>
                </tr>
                <tr>
                  <th>Alcoholpercentage</th>
                  <td>{product.alcoholpercentage}</td>
                </tr>
                <tr>
                  <th>Merk</th>
                  <td>{product.brandEntity.name}</td>
                </tr>
                <tr>
                  <th>Land</th>
                  <td>{product.countryEntity.name}</td>
                </tr>
              </table>
            </div>
          </main>
        </div>
      </section>
    )
  }
}
