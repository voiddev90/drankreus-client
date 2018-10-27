import { AxiosResponse } from "axios"

export class User {
  Id?: number
  Email: string
  Password: string
  FirstName: string
  Prefix?: string
  LastName: string
  Street?: string
  BuildingNumber?: string
  PostalCode?: string
  Area?: string
  Admin: boolean
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

export type UserLoginState =
  | {
      type: "notLoggedIn"
    }
  | {
      type: "loggedIn"
      user: Option<User>
      JWT: string
    }
  | {
      type: "error"
      message: string
    }

export type LoginResponse = {
  token_type: string
  expires: string
  access_token: string
  user: User
}
