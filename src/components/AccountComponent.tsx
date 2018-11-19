import * as React from 'react'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import {
  isLoggedIn,
  getLoggedInuser,
  logOut,
  ObjectToArrayExtra,
  deduceInputType
} from '../helpers'
import { Redirect } from 'react-router'
import { WithPutState, User, Option, AuthAxios, Fields, Field } from '../model'
import { Link } from 'react-router-dom'
import { Map } from 'immutable'
import { string } from 'prop-types'

type Props = {}
type State = WithPutState<User> & {
  fields: Fields
}

export default class AccountComponentn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = isLoggedIn()
      ? {
          type: 'loading',
          fields: []
        }
      : {
          type: 'editing',
          data: { type: 'none' },
          fields: []
        }
  }

  componentDidMount() {
    if (isLoggedIn()) {
      AuthAxios.get(
        `http://localhost:5000/api/users/${getLoggedInuser().id &&
          getLoggedInuser().id}`
      )
        .then((response: AxiosResponse<User>) => {
          let fields: Fields
          const user = Option(response.data)
          if (user.type == 'some') {
            fields = ObjectToArrayExtra<Field, User>(user.value, (name: string, object: User) => {
              return {
                name: name,
                value: '',
                valid: false,
                validated: false,
                type: deduceInputType(name)
              }
            })
          } else {
            fields = []
          }
          this.setState({
            type: 'editing',
            data: Option(response.data),
            fields: Option(response.data).type == 'some' ? fields : []
          })
        })
        .catch((response: AxiosError) => {
          this.setState({
            ...this.state,
            type: 'error',
            error: {
              reason: response.response.status,
              error: response.response.statusText
            }
          })
        })
    }
  }

  render() {
    document.title = 'DrankReus - Account'
    switch (this.state.type) {
      case 'loading':
        return <>Account ophalen...</>
      case 'error':
        switch (this.state.error.reason) {
          case 401:
            logOut()
            window.setTimeout(
              () =>
                this.setState({
                  ...this.state,
                  type: 'editing',
                  data: { type: 'none' }
                }),
              500
            )
            return <>Fout bij het authoriseren...</>
          default:
            return (
              <>
                Fout bij het ophalen van het account: {this.state.error.reason}{' '}
                {this.state.error.error}
              </>
            )
        }
      case 'updating':
      case 'success':
      case 'editing':
        if (
          this.state.type == 'editing' &&
          this.state.data.type != 'none' &&
          isLoggedIn()
        ) {
          return (
            <section className='account'>
              <div className='user-info'>
                {this.state.fields.map((field: Field) => {
                  return (
                    <p className={`field ${field.name}`}>
                      <label>
                        {field.name != 'id' && field.name}
                        <input type={field.name != 'id' ? field.type: 'hidden'} value={field.value} />
                      </label>
                    </p>
                  )
                })}
              </div>
              <div className='account-menu'>
                <ul>
                  <li>
                    <Link to='/cart'>Winkelwagen</Link>
                  </li>
                  <li>
                    <Link to='/account/favourites'>Favorieten</Link>
                  </li>
                  <li>
                    <Link to='account/history'>Geschiedenis</Link>
                  </li>
                </ul>
              </div>
            </section>
          )
        } else {
          return <Redirect to='login' />
        }
    }
  }
}
