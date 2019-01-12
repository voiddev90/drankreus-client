import * as React from 'react'
import { Redirect } from 'react-router-dom';
import { ReactCookieProps, withCookies } from 'react-cookie';
import { Shipment, User, WithPostState, ShoppingCart, getAuthorizedAxiosInstance, CartResponse, ProductResponse, Product } from '../model';
import { isLoggedIn, getLoggedInuser, clearShoppingCart, distinct } from '../helpers'
import Axios, { AxiosResponse, AxiosError } from 'axios';
import { ShoppingCartItemComponent } from './ShoppingCart/ShoppingCartItemComponent';
import { SideBar } from './UI/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faUser, faTruck, faCar, faMoneyBillAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { CheckboxRadioElement } from './UI/CheckboxRadioElement';
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import ShoppingCartRecap from './ShoppingCart/ShoppingCartRecap';

type State = Shipment &
  WithPostState & {
    step: number
    paymentType: string
    shipmentType: string
    saveUserDetails: boolean,
    cartData: any
  }

class OrderComponent extends React.Component<ReactCookieProps, State> {
  constructor(props: ReactCookieProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.state = {
      type: 'editing',
      step: 0,
      email: '',
      firstname: '',
      prefix: '',
      lastname: '',
      paymentType: '',
      shipmentType: '',
      street: '',
      buildingNumber: '',
      postalCode: '',
      area: '',
      saveUserDetails: false,
      cartData: null
    }
  }
  componentDidMount() {
    if (isLoggedIn()) {

      const user: User = getLoggedInuser()
      this.setState({
        ...this.state,
        firstname: user.firstName,
        prefix: user.prefix ? user.prefix : '',
        lastname: user.lastName,
        email: user.email,
        street: user.street ? user.street : '',
        buildingNumber: user.buildingNumber ? user.buildingNumber : '',
        postalCode: user.postalCode ? user.postalCode : '',
        area: user.area ? user.area : ''
      })
    }
    this.recap();
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.name as keyof string
    const value = e.currentTarget.value
    this.setState({ ...this.state, [key]: value } as any)
  }
  handleOnSubmit(e: any) {
    e.preventDefault()
    if (
      this.state.street == '' ||
      this.state.buildingNumber == '' ||
      this.state.postalCode == '' ||
      this.state.area == ''
    ) {
      this.setState({
        ...this.state,
        type: 'error',
        error: 'Sommige velden zijn nog leeg'
      })
    } else {
      this.incr()
    }
  }
  processing() {
    const shoppingCart: ShoppingCart = this.props.cookies.get('shopping-cart')
    const requestBody = shoppingCart.filter(distinct).map(productId => {
      return {
        ProductId: productId,
        amount: shoppingCart.filter(product => product == productId).length
      }
    })
    console.log(requestBody);
    const orderDetails = {
      Email: this.state.email,
      Firstname: this.state.firstname,
      Lastname: this.state.lastname,
      Street: this.state.street,
      BuildingNumber: this.state.buildingNumber,
      PostalCode: this.state.postalCode,
      Area: this.state.area,
      orderProductAmount: requestBody,
      SaveAddress: this.state.saveUserDetails
    }
    console.log(requestBody);
    let request;
    if (isLoggedIn() ?
      request = getAuthorizedAxiosInstance().post('http://localhost:5000/api/Orders', orderDetails)
      : request = Axios.post('http://localhost:5000/api/Orders', orderDetails))
      request.then((value: AxiosResponse) => {
        console.log(value)
      })
    clearShoppingCart(this.props.cookies);
    this.incr();
  }
  checkFirstPage() {
    console.log('checking page 1')
    if (this.state.firstname != '' && this.state.lastname != '' && this.state.email != '' && this.state.postalCode != '' && this.state.buildingNumber != '' && this.state.street != '' && this.state.area != '') {
      this.incr()
    } else {
      this.setState({
        ...this.state,
        type: 'error',
        error: 'Er zijn verplichte velden leeggelaten.'
      })
    }
  }
  checkSecondPage() {
    console.log('checking page 2')
    if (this.state.paymentType != '' && this.state.shipmentType != '') {
      this.incr()
    } else {
      this.setState({
        ...this.state,
        type: 'error',
        error: 'Er zijn verplichte velden leeggelaten.'
      })
    }
  }
  incr() {
    this.setState({ ...this.state, step: this.state.step + 1 });
  }
  decr() {
    this.setState({ ...this.state, step: this.state.step - 1 });
  }
  recap() {
    const shoppingCart: number[] = this.props.cookies.get('shopping-cart')
    if (shoppingCart) {
      const url: string = shoppingCart
        .filter(distinct)
        .map((productId: number) => `products=${productId}`)
        .join('&')
      Axios.get(`http://localhost:5000/api/product/?index=0&size=100&${url}`)
        .then((value: AxiosResponse<Product[]>) => {
          this.setState({
            cartData: value.data
          }, () => console.log(this.state.cartData.items))
        })

    }
  }
  render() {
    const shoppingCart: number[] = this.props.cookies.get('shopping-cart')
    switch (this.state.step) {
      case 0:
        return (
          <section className='order order-shipment-details container-fluid'>
            <div className='order-inner order-shipment-details-inner row align-center-vh'>
              <div className="shipment-details-form col-5">
                <h2 className='h1'>Adresgegevens</h2>
                {this.state.type == 'error' &&
                  this.state.error && <small>{this.state.error}</small>}
                <form>
                  {isLoggedIn() ? <>
                    <p className='logged-in-user-full-name'><FontAwesomeIcon icon={faUser} size='2x' className='first' />{`${this.state.firstname} ${this.state.prefix && `${this.state.prefix} `}${this.state.lastname}`}</p>
                  </> : <>
                      <p className='form-field'>
                        <input name="email" type='text' placeholder="Email address" value={this.state.email} onChange={this.handleChange} />
                      </p>
                      <div className='form-field-row row'>
                        <p className='form-field'>
                          <input name="firstname" type='text' placeholder="Voornaam" value={this.state.firstname} onChange={this.handleChange} />
                        </p>
                        <p className='form-field'>
                          <input name="prefix" type='text' placeholder="Tussenvoegsel" value={this.state.prefix} onChange={this.handleChange} />
                        </p>
                      </div>
                      <p className='form-field'>
                        <input name="lastname" type='text' placeholder="Achternaam" value={this.state.lastname} onChange={this.handleChange} />
                      </p>
                    </>}
                  <div className='form-field-row row'>
                    <p className='form-field col-8'>
                      <input name="postalCode" type='text' placeholder="Postcode" value={this.state.postalCode} onChange={this.handleChange} />
                    </p>
                    <p className='form-field col-4'>
                      <input name="buildingNumber" type='text' placeholder="Huisnr." value={this.state.buildingNumber} onChange={this.handleChange} />
                    </p>
                  </div>
                  <p className='form-field'>
                    <input name="street" type='text' placeholder="Straat" value={this.state.street} onChange={this.handleChange} />
                  </p>
                  <p className='form-field'>
                    <input name="area" type='text' placeholder="Stad" value={this.state.area} onChange={this.handleChange} />
                  </p>
                  <p className='form-field form-field-submit right-align'>
                    <button type='button' className='btn btn-sm btn-primary' onClick={(e) => this.checkFirstPage()}>Volgende <FontAwesomeIcon icon={faChevronRight} className='last' /></button>
                  </p>
                </form>
              </div>
              <SideBar type='blank' size={3}>
                Bla
              </SideBar>
            </div>
          </section>
        )
      case 1:
        return (
          <section className='order order-payment-shipment-options container-fluid'>
            <div className='order-inner order-shipment-details-inner row align-center-vh'>
              <div className="payment-shopment-options-forms col-4">
                <h2 className='h1'>Verzendmethode</h2>
                {this.state.type == 'error' &&
                  this.state.error && <small>{this.state.error}</small>}
                <form>
                  <div className='row'>
                    <p className='form-field col-6'>
                      <CheckboxRadioElement type='radio' id='shipmentType1' name='shipmentType' value='Bezorgen' onChange={this.handleChange}>
                        <FontAwesomeIcon icon={faTruck} className='first' />Bezorgen
                      </CheckboxRadioElement>
                    </p>
                    <p className='form-field col-6'>
                      <CheckboxRadioElement type='radio' id='shipmentType2' name='shipmentType' value='Ophalen' onChange={this.handleChange}>
                        <FontAwesomeIcon icon={faCar} className='first' />Ophalen
                      </CheckboxRadioElement>
                    </p>
                  </div>
                </form>
                <h2 className='h1'>Betaalmethode</h2>
                <form>
                  <div className='row'>
                    <p className='form-field col'>
                      <CheckboxRadioElement type='radio' id='paymentType1' value='Contant' name='paymentType' onChange={this.handleChange}>
                        <FontAwesomeIcon icon={faMoneyBillAlt} className='first' />Contant
                      </CheckboxRadioElement>
                    </p>
                    <p className='form-field col'>
                      <CheckboxRadioElement type='radio' id='paymentType2' value='PayPal' name='paymentType' onChange={this.handleChange}>
                        <FontAwesomeIcon icon={faPaypal} className='first' />Paypal
                      </CheckboxRadioElement>
                    </p>
                  </div>
                </form>
                <div className='row'>
                  <p className='form-field form-field-submit col-6'><button type='button' onClick={() => this.decr()} className='btn btn-sm btn-primary'>
                    <FontAwesomeIcon icon={faChevronLeft} className='first' />Vorige
                  </button></p>
                  <p className='form-field form-field-submit right-align col-6'><button type='button' onClick={() => this.checkSecondPage()} className='btn btn-sm btn-primary'>Volgende<FontAwesomeIcon icon={faChevronRight} className='last' /></button></p>
                </div>
              </div>
              <SideBar type='blank' size={3}>
                Bla
              </SideBar>
            </div>
          </section>)
      case 2:
        return (
          <section className='order order-recap container-fluid'>
            <div className='order-inner order-recap-inner row align-center-vh'>
              <div className="confirmation col-4">
                <h2 className='h1'>Overzicht</h2>
                {this.state.type == 'error' &&
                  this.state.error && <small>{this.state.error}</small>}
                <div className='personal-info row'>
                  <div className='col-4'>
                    <FontAwesomeIcon icon={faUser} size='3x' />
                  </div>
                  <div className='info col-8'>
                    <p className='name'>{`${this.state.firstname} ${this.state.prefix && `${this.state.prefix} `}${this.state.lastname}`}</p>
                    <p className='address'>{`${this.state.street} ${this.state.buildingNumber}`}</p>
                    <p className='postal-code-city'>{`${this.state.postalCode} ${this.state.area}`}</p>
                  </div>
                </div>
                <table className='recap-table'>
                  <tr>
                    <th className='product' colSpan={5}>Product</th>
                    <th className='price'>Prijs</th>
                    <th className='amount' colSpan={2}>Aantal</th>
                  </tr>
                  {this.state.cartData.items
                    .filter(
                      (product: Product) => shoppingCart.indexOf(product.id) != -1
                    )
                    .map((product: Product) => (
                      <ShoppingCartItemComponent
                        {...product}
                        key={product.id}
                        amount={
                          shoppingCart.filter(value => value == product.id).length
                        }
                        allowEdits={false}
                        checkout={true}
                      />
                    ))}
                </table>
                <ShoppingCartRecap {...this.props} />
                <h4>Betaalmethode</h4>
                <p className='payment-type'>{this.state.paymentType == 'Contant' ? <FontAwesomeIcon icon={faMoneyBillAlt} className='first' /> : <FontAwesomeIcon icon={faPaypal} className='first' />}<span>{this.state.paymentType}</span></p>
                <h4>Verzendmethode</h4>
                <p className='shipment-type'>{this.state.shipmentType == 'Bezorgen' ? <FontAwesomeIcon icon={faTruck} className='first' /> : <FontAwesomeIcon icon={faCar} className='first' />}<span>{this.state.shipmentType}</span></p>
                {isLoggedIn() ?
                  <p className='form-field'><label><input type="checkbox" checked={this.state.saveUserDetails}
                    onChange={() => this.setState({ ...this.state, saveUserDetails: !this.state.saveUserDetails })} />Gegevens opslaan</label></p>
                  : ""
                }
                <div className='row'>
                  <p className='form-field form-field-submit col-6'><button type='button' onClick={() => this.processing()} className='btn btn-sm btn-primary'>
                    <FontAwesomeIcon icon={faChevronLeft} className='first' />Vorige
                  </button></p>
                  <p className='form-field form-field-submit right-align col-6'><button type='button' onClick={() => this.setState({ ...this.state, step: 0 })} className='btn btn-sm btn-primary'>Betalen</button></p>
                </div>
              </div>
              <SideBar type='blank' size={3}>
                Bla
              </SideBar>
            </div>
          </section>
        )
      case 3:
        return <Redirect to={{ pathname: '/' }} />
      default:
        return <></>
    }
  }
}
export default withCookies(OrderComponent as any)
