import { Map, List } from "immutable"

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
  alcoholpercentage: number
  brand: List<Tag>
  category: List<Tag>
  country: List<Tag>
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
  itemsPerPage: number
  totalPages: number
  items: List<T>
}

export function Option<T>(value: T): Option<T> {
  if (!value) return { type: "none" }
  return { type: "some", value: value }
}

export type Option<T> =
  | {
      type: "none"
    }
  | {
      type: "some"
      value: T
    }

export type WithDataState<T> =
  | {
      type: "loading"
    }
  | {
      type: "loaded"
      data: Option<T>
    }
  | {
      type: "error"
      reason: number
    }

export type LoginResponse = {
  token_type: string
  expires: string
  access_token: string
  user: User
}

export type ProductResponse = {
  products: Page<Product>
  filterables: Map<string, List<Tag | number | string>>
}

export type Filter<T = any> = Map<string, T>
