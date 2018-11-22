import { UserTypes } from './types'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { LoginResponse } from '../model'
import { Dispatch } from 'redux'

export const fetchUser = (response: AxiosResponse<LoginResponse>) => {
  return {
    type: UserTypes.FETCH_USER,
    payload: {
      user: response.data.user,
      access_token: response.data.access_token,
      token_type: response.data.token_type,
      expires: response.data.expires
    }
  }
}
