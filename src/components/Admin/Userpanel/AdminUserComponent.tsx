import * as React from 'react'
import {
  Product,
  WithDeleteState,
  getAuthorizedAxiosInstance,
  User
} from '../../../model'
import { Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

type Props = {
  user: User
}

type State = WithDeleteState<User>

export default class AdminUserComponent extends React.Component<
  Props,
  State
  > {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'loaded',
      data: {
        type: 'some',
        value: this.props.user
      }
    }
  }

  deleteUser() {
    this.setState({
      type: 'removing'
    })
    getAuthorizedAxiosInstance()
      .delete(`users/${this.props.user.id}`)
      .then(response => {
        this.setState({
          type: 'success'
        })
      })
      .catch(response => {
        this.setState({
          type: 'error'
        })
      })
  }

  render() {
    return this.state.type != 'success' ? (
      <article className={`product product-${this.state.type}`}>
        <header className='product-header' />
        <main className='product-content'>
          <div className='product-name'>
            <Link
              to={{
                pathname: `/admin/users/${this.props.user.id}`,
                state: this.props.user
              }}
            >
              {`${this.props.user.firstName}${this.props.user.prefix && ` ${this.props.user.prefix}`} ${this.props.user.lastName}`}
            </Link>
          </div>
          <div className='product-delete'>
            <Button onClick={() => this.deleteUser()}>
              {this.state.type != 'removing' ? (
                <FontAwesomeIcon icon={faTrash} />
              ) : (
                  <FontAwesomeIcon icon={faSpinner} spin />
                )}
            </Button>
          </div>
        </main>
      </article>
    ) : (
        <article className='product removed'>
          <main className='product-content'>
            <div className='product-state'>Gebruiker gedeactiveerd</div>
          </main>
        </article>
      )
  }
}
