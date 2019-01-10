import * as React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { ReactCookieProps, withCookies } from 'react-cookie'
import {
  Shipment,
  User,
  WithPostState,
  ShoppingCart,
  getAuthorizedAxiosInstance
} from '../model'
import {
  isLoggedIn,
  getLoggedInuser,
  clearShoppingCart,
  distinct
} from '../helpers'
import Axios, { AxiosResponse } from 'axios'

type State = Shipment &
  WithPostState & {
    step: number
    paymentType: string
    shipmentType: string
    saveUserDetails: boolean
  }

class OrderComponent extends React.Component<ReactCookieProps, State> {
  constructor(props: ReactCookieProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.state = {
      type: 'editing',
      step: 0,
      email: '',
      firstname: '',
      lastname: '',
      paymentType: '',
      shipmentType: '',
      street: '',
      buildingNumber: '',
      postalCode: '',
      area: '',
      saveUserDetails: false
    }
  }
  componentDidMount() {
    if (isLoggedIn()) {
      const user: User = getLoggedInuser()
      console.log('hier')
      this.setState({
        ...this.state,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        street: user.street,
        buildingNumber: user.buildingNumber,
        postalCode: user.postalCode,
        area: user.area
      })
      console.log(this.state.street)
    }
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
    /*const shipment: Shipment = {
            street: this.state.street,
            buildingNumber : this.state.buildingNumber,
            postalCode : this.state.postalCode,
            area : this.state.area,
        }*/
    //
  }
  processing() {
    /* TODO:
        save user details
        */
    const shoppingCart: ShoppingCart = this.props.cookies.get('shopping-cart')
    const requestBody = shoppingCart.filter(distinct).map(productId => {
      return {
        ProductId: productId,
        amount: shoppingCart.filter(product => product == productId).length
      }
    })
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
    console.log(requestBody)
    let request
    if (
      isLoggedIn()
        ? (request = getAuthorizedAxiosInstance().post(
            'http://localhost:5000/api/Orders',
            orderDetails
          ))
        : (request = Axios.post(
            'http://localhost:5000/api/Orders',
            orderDetails
          ))
    )
      request.then((value: AxiosResponse) => {
        console.log(value)
      })
    clearShoppingCart(this.props.cookies)
    this.incr()
  }
  incr() {
    this.setState({ ...this.state, step: this.state.step + 1 })
  }
  render() {
    switch (this.state.step) {
      case 0:
        return (
          <div className='row'>
            <div className='col'>
              <div className='shipment-details'>
                <h1>Adresgegevens</h1>
                <form>
                  {this.state.type == 'error' && this.state.error && (
                    <small>{this.state.error}</small>
                  )}{' '}
                  <br />
                  <input
                    className='form-control'
                    name='firstname'
                    placeholder='Voornaam'
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    className='form-control'
                    name='lastname'
                    placeholder='Achternaam'
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    className='form-control'
                    name='postalCode'
                    placeholder='Postcode'
                    value={this.state.postalCode}
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    className='form-control'
                    name='street'
                    placeholder='Straat'
                    value={this.state.street}
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    className='form-control'
                    name='buildingNumber'
                    placeholder='Huisnummer'
                    value={this.state.buildingNumber}
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    className='form-control'
                    name='area'
                    placeholder='Plaats'
                    value={this.state.area}
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    className='form-control'
                    name='email'
                    placeholder='E-mailadres'
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <br />
                </form>
              </div>
            </div>
            <div className='alert alert-warning' role='alert'>
              Stap 1 van de 4
            </div>
            <div className='col-2'>
              <button onClick={e => this.handleOnSubmit(e)}>Volgende</button>
              <NavLink to='/cart' className='button'>
                Terug
              </NavLink>
            </div>
          </div>
        )
      case 1:
        return (
          <div className='payment-options'>
            <h1>Verzendmethode</h1>
            bezorgen
            <input
              type='radio'
              name='shipmentType'
              value='bezorgen'
              onChange={this.handleChange}
            />
            <br />
            ophalen
            <input
              type='radio'
              name='shipmentType'
              value='ophalen'
              onChange={this.handleChange}
            />
            <br />
            iDEAL
            <input
              type='radio'
              name='paymentType'
              value='contant'
              onChange={this.handleChange}
            />
            <br />
            paypal
            <input
              type='radio'
              name='paymentType'
              value='paypal'
              onChange={this.handleChange}
            />
            <br />
            <button onClick={() => this.incr()}>Submit</button>
          </div>
        )
      case 2:
        return (
          <div className='row'>
            <div className='col'>
              <div id='confirmation'>
                <h1>Begrepen, wij gaan voor u aan het werk!</h1>
                Uw informatie <br />
                <label>Straat: {this.state.street}</label> <br />
                <label>Huisnummer: {this.state.buildingNumber}</label> <br />
                <label>PostCode: {this.state.postalCode}</label> <br />
                <label>Stad: {this.state.area}</label> <br />
                Betaalmethode: <br />
                <label>{this.state.paymentType}</label> <br />
                BezorgMethode: <br />
                <label>{this.state.shipmentType}</label> <br />
                {isLoggedIn() ? (
                  <label>
                    Gegevens opslaan
                    <input
                      type='checkbox'
                      checked={this.state.saveUserDetails}
                      onChange={() =>
                        this.setState({
                          ...this.state,
                          saveUserDetails: !this.state.saveUserDetails
                        })
                      }
                    />
                  </label>
                ) : (
                  ''
                )}
                <button onClick={() => this.processing()}>Betalen</button>
                <button
                  onClick={() => this.setState({ ...this.state, step: 0 })}
                >
                  Veranderen
                </button>
              </div>
            </div>
            <p>foto</p>
          </div>
        )
      case 3:
        return <Redirect to={{ pathname: '/' }} />
      default:
        return <></>
    }
  }
}
export default withCookies(OrderComponent as any)
