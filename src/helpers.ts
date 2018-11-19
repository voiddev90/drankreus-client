import { User, Option, ShoppingCart } from './model'
import { Cookies } from 'react-cookie'
import { string } from 'prop-types'
import { Map } from 'immutable'

const isLoggedIn = () => {
  return (
    localStorage.getItem('user') != undefined &&
    localStorage.getItem('token') != undefined &&
    localStorage.getItem('type') != undefined
  )
}

const getLoggedInuser = () => {
  const user: User = JSON.parse(localStorage.getItem('user'))
  return user
}

const getJWT = () => {
  const JWT: string = localStorage.getItem('token')
  return JWT
}

const getTokenType = () => {
  const type: string = localStorage.getItem('type')
  return type
}

const logOut = () => {
  localStorage.clear()
}

function OptionIsSome<T>(value: Option<T>): boolean {
  return value.type == 'some'
}

function handleFieldChange<T>(field: string) {
  return (value: T) => {
    this.setState({ ...this.state, [field]: value })
  }
}

function validateField(field: string, extraField?: string) {
  return (predicate: boolean, extraFieldValue?: boolean) => {
    this.setState({
      ...this.state,
      [field]: predicate,
      [extraField]: extraFieldValue
    })
  }
}

const distinct = (value: number, index: number, self: number[]) =>
  self.indexOf(value) === index

const fillArray = (amount: number) => <T>(value: T) => {
  const array: T[] = []
  for (let i = 0; i < amount; i++) {
    array.push(value)
  }
  return array
}

const clearShoppingCart: (cookies: Cookies) => void = cookies => {
  cookies.remove('shopping-cart')
}

const deleteItemFromShoppingCart = (cookies: Cookies) => (product: number) => {
  const shoppingCart: number[] = cookies.get('shopping-cart')
  const i: number = shoppingCart.indexOf(product)
  shoppingCart.splice(i, 1)
  cookies.set('shopping-cart', shoppingCart)
}

const addToCart = (cookies: Cookies) => (products: number[]) => {
  if (cookies.get('shopping-cart')) {
    const shoppingCart: ShoppingCart = cookies.get('shopping-cart')
    const newShoppingcart: ShoppingCart = shoppingCart.concat(products)
    cookies.set('shopping-cart', newShoppingcart)
  } else {
    cookies.set('shopping-cart', products)
  }
}

function ObjectToArray(object: Object) {
  return Object.keys(object).map(field => {
    return ''
  })
}

function ObjectToArrayExtra<U, T>(object: T, callback: (value: string, o: T) => U) {
  const fields = Object.keys(object)
  return fields.map(value => {
    return callback(value, object)
  })
}

const deduceInputType = (name: string, types?: string[]) => {
  let list: string[] = !types
    ? ['text', 'email', 'e-mail', 'password', 'number', 'nr']
    : types
  const regex: RegExp = new RegExp(`(${list.join('|')})`, 'i')
  const match = name.match(regex)
  const result = (match && match[0].toLowerCase()) || 'text'
  return result
}

export {
  isLoggedIn,
  getLoggedInuser,
  logOut,
  OptionIsSome,
  handleFieldChange,
  validateField,
  clearShoppingCart,
  deleteItemFromShoppingCart,
  distinct,
  addToCart,
  fillArray,
  getJWT,
  getTokenType,
  ObjectToArrayExtra,
  deduceInputType
}
