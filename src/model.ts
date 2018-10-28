import { AxiosResponse } from "axios"

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

export type Option<T> =
  | {
      kind: "none"
    }
  | {
      kind: "some"
      value: AxiosResponse<T>
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
      error: string
    }

export type LoginResponse = {
  token_type: string
  expires: string
  access_token: string
  user: User
}
