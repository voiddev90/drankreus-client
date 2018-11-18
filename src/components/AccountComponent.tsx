import * as React from 'react'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { isLoggedIn, getLoggedInuser, logOut } from '../helpers'
import { Redirect } from 'react-router'
import { WithPutState, User, Option, AuthAxios } from '../model'
import { Link } from 'react-router-dom'

type Props = {}
type State = WithPutState<User>

export default class BaseComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = isLoggedIn()
      ? {
          type: 'loading'
        }
      : {
          type: 'editing',
          data: { type: 'none' }
        }
  }

  componentDidMount() {
    if (isLoggedIn()) {
      AuthAxios.get(
        `http://localhost:5000/api/users/${getLoggedInuser().id &&
          getLoggedInuser().id}`
      )
        .then((response: AxiosResponse<User>) => {
          this.setState({
            type: 'editing',
            data: Option(response.data)
          })
        })
        .catch((response: AxiosError) => {
          console.log(JSON.stringify(response))
          this.setState({
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
              () => this.setState({ type: 'editing', data: { type: 'none' } }),
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
                <img />
                <p className='user-name'>
                  {this.state.data.value.firstName}{' '}
                  {this.state.data.value.prefix}{' '}
                  {this.state.data.value.lastName}
                </p>
                <p className='user-mail'>{this.state.data.value.email}</p>
                <p className='user-points' />
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
