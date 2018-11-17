import { Map, List } from 'immutable'

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

export class Product {
  id: number
  name: string
  description: string
  price: number
  volume: number
  alcoholPercentage: number
  url: string
  brandId: number
  categoryId: number
  countryId: number
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
  if (!value) return { type: 'none' }
  return { type: 'some', value: value }
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
  }
  | {
    type: 'error'
    error?: string
  }
  | {
    type: 'success'
    message?: string
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

export type LoginResponse = {
  token_type: string
  expires: string
  access_token: string
  user: User
}

export type ProductResponse = Page<Product>

export type Filter<T = any> = Map<string, T>

export type ShoppingCart = number[]
