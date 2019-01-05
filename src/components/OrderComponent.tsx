import * as React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { ReactCookieProps, withCookies } from 'react-cookie'
import { Shipment, User, WithPostState } from '../model'
import {
  handleFieldChange,
  validateField,
  isLoggedIn,
  getLoggedInuser,
  clearShoppingCart
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
      if (user.buildingNumber != null)
        this.setState({
          ...this.state,
          street: user.street,
          buildingNumber: user.buildingNumber,
          postalCode: user.postalCode,
          area: user.area
        })
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
    const shoppingCart: number[] = this.props.cookies.get('shopping-cart')
    console.log(shoppingCart)
    const request = Axios.put(
      'http://localhost:5000/api/product/purchased',
      shoppingCart
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
          <div className='shipment-details'>
            <p>Adresgegevens</p>

            <form>
              {this.state.type == 'error' && this.state.error && (
                <small>{this.state.error}</small>
              )}{' '}
              <br />
              <input
                className='street-name'
                name='street'
                placeholder='Straat'
                value={this.state.street}
                onChange={this.handleChange}
              />
              <br />
              <input
                className='building-number'
                name='buildingNumber'
                placeholder='Huisnummer'
                value={this.state.buildingNumber}
                onChange={this.handleChange}
              />
              <br />
              <input
                className='postal-code'
                name='postalCode'
                placeholder='PostCode'
                value={this.state.postalCode}
                onChange={this.handleChange}
              />
              <br />
              <input
                className='city'
                name='area'
                placeholder='Stad'
                value={this.state.area}
                onChange={this.handleChange}
              />
              <br />
              <button
                className='continue-button'
                onClick={e => this.handleOnSubmit(e)}
              >
                Volgende >
              </button>
            </form>
          </div>
        )
      case 1:
        return (
          <div className='payment' id='payment-options'>
            <p>Bezorgopties</p>
            <br className='bezorgen' />
            Bezorgen
            <input
              className='bezorgen-button'
              type='radio'
              name='shipmentType'
              value='bezorgen'
              onChange={this.handleChange}
            />
            <br className='ophalen' />
            Ophalen
            <input
              type='radio'
              name='shipmentType'
              value='ophalen'
              onChange={this.handleChange}
            />
            <p>Betaalopties</p>
            <br />
            Contant
            <input
              type='radio'
              name='paymentType'
              value='contant'
              onChange={this.handleChange}
            />
            <br />
            Paypal
            <input
              type='radio'
              name='paymentType'
              value='paypal'
              onChange={this.handleChange}
            />
            <br />
            <button
              className='back-button'
              onClick={() => this.setState({ ...this.state, step: 0 })}
            >
              Terug
            </button>
            <button className='continue-button' onClick={() => this.incr()}>
              Volgende >
            </button>
          </div>
        )
      case 2:
        return (
          <div className='confirm' id='confirmation'>
            <p>Bevestiging</p>
            <p>Controleer hier uw informatie</p>
            <h1>uw adres</h1>
            <br />
            <label className='confirm-street'>
              Straat: {this.state.street}
            </label>{' '}
            <br />
            <label className='confirm-homeNumber'>
              Huisnummer: {this.state.buildingNumber}
            </label>{' '}
            <br />
            <label className='confirm-postCode'>
              Postcode: {this.state.postalCode}
            </label>{' '}
            <br />
            <label className='confirm-city'>Stad: {this.state.area}</label>{' '}
            <br />
            <h2>Bezorg -en betaalmethode</h2>
            <label className='bezorgmeth'>
              Bezorgmethode: {this.state.shipmentType}
            </label>
            <label className='paymeth'>
              Betaalmethode: {this.state.paymentType}
            </label>
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
            <button
              className='change'
              onClick={() => this.setState({ ...this.state, step: 1 })}
            >
              Terug
            </button>
            <button className='pay' onClick={() => this.processing()}>
              Betalen
            </button>
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
