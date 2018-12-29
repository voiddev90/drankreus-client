import { Map, List } from 'immutable'
import Axios from 'axios'
import { isLoggedIn, getJWT, getTokenType } from './helpers'

export class User {
  id?: number
  email: string
  password: string
  firstName: string
  prefix?: string
  lastName: string
  street?: string
  buildingNumber?: string
  postalCode?: string
  area?: string
  admin: boolean
}

export class Shipment{
  street?: string
  buildingNumber?: string
  postalCode?: string
  area?: string
}
export class Product {
  id: number
  name: string
  description: string
  price: number
  volume: string
  alcoholpercentage: string
  url: string
  brandEntity: Brand
  categoryEntity: Category
  countryEntity: Country
}

export class Tag {
  id: number
  name: string
}

export class Brand extends Tag {}

export class Category extends Tag {}

export class Country extends Tag {}

export class Page<T> {
  index: number
  totalPages: number
  items: List<T>
}

export function Option<T>(value: T): Option<T> {
  if (value) {
    switch (typeof value) {
      case 'object':
        return Object.keys(value).length == 0
          ? { type: 'none' }
          : { type: 'some', value: value }
      case 'string':
        return value.length == 0
          ? { type: 'none' }
          : { type: 'some', value: value }
      default:
        return { type: 'none' }
    }
  }
  return { type: 'none' }
}

export type Option<T> =
  | {
      type: 'none'
    }
  | {
      type: 'some'
      value: T
    }

export type WithGetState<T> =
  | {
      type: 'loading'
    }
  | {
      type: 'loaded'
      data: Option<T>
    }
  | {
      type: 'error'
      reason: number
    }

export type WithPostState =
  | {
      type: 'editing'
    }
  | {
      type: 'creating' | 'validating'
    }
  | {
      type: 'error'
      error?: string
    }
  | {
      type: 'success'
      message?: string
    }

export type WithPutState<T> =
  | {
      type: 'loading'
    }
  | {
      type: 'loaded' | 'editing'
      data: Option<T>
    }
  | {
      type: 'updating'
      data: Option<T>
    }
  | {
      type: 'error'
      error?: Error
      data?: Option<T>
    }
  | {
      type: 'success'
      message?: string
      data: Option<T>
    }

export type WithDeleteState<T> =
  | {
      type: 'loading'
    }
  | {
      type: 'loaded' | 'editing'
      data: Option<T>
    }
  | {
      type: 'removing'
    }
  | {
      type: 'error'
      error?: string
    }
  | {
      type: 'success'
      message?: string
    }

export type Endpoint = 'product' | 'brand' | 'cart' | 'category' | 'orders' | 'users' | 'wishlists' | 'country'

export type Error = {
  reason: number
  error: string
}

export type LoginResponse = {
  token_type: string
  expires: Date
  access_token: string
  user: User
}

export type ProductResponse = Page<Product>

export type CartResponse = {
  tax: number
  grandtotal: number
}

export type Filter<T = any> = Map<string, T>

export type ShoppingCart = number[]

export type Field = {
  name: string
  value: string
  valid: boolean
  validated: boolean
  type: string
}

export type Fields = Field[]

export const AxiosDefault = Axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: 1000
})

export const getAuthorizedAxiosInstance = () => {
  return Axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 1000,
    headers: isLoggedIn()
      ? { 'Authorization': `${getTokenType()} ${getJWT()}` }
      : {}
  })
}
