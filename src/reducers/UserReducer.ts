import { UserTypes } from '../actions/types'
import { User } from '../model'
import { stat } from 'fs';

type State = {
  token_type: string,
  expires: Date,
  access_token: string
  user: User
}

const initState: State = {
  token_type: 'test',
  expires: null,
  access_token: '',
  user: null
}

export default (state = initState, action: any) => {
  switch (action.type) {
    case UserTypes.FETCH_USER:
    return {
        ...state,
        token_type: action.payload.token_type,
        expires: action.payload.expires,
        access_token: action.payload.access_token,
        user: action.payload.user

    }
    default:
      return state
  }
}
