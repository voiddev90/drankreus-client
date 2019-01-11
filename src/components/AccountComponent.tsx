import * as React from 'react'
import { AxiosResponse, AxiosError } from 'axios'
import {
  isLoggedIn,
  getLoggedInuser,
  logOut,
  ObjectToArrayExtra,
  deduceInputType,
  handleFieldChange
} from '../helpers'
import { Redirect } from 'react-router'
import {
  WithPutState,
  User,
  Option,
  Fields,
  Field,
  getAuthorizedAxiosInstance
} from '../model'
import { AccountMenuComponent } from './Menu/AccountMenuComponent';
import { SideBar } from './UI/SideBar';

type Props = {}
type State = WithPutState<User> & {
  passwordConfirm: string
  emailConfirm: string
}

export default class AccountComponent extends React.Component<Props, State> {
  handleFieldChange2: <T>(field: string) => (value: T) => void

  constructor(props: Props) {
    super(props)

    this.state = isLoggedIn()
      ? {
        type: 'loading',
        passwordConfirm: '',
        emailConfirm: ''
      }
      : {
        type: 'editing',
        data: { type: 'none' },
        passwordConfirm: '',
        emailConfirm: ''
      }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleFieldChange2 = handleFieldChange.bind(this)
  }

  componentDidMount() {
    if (isLoggedIn()) {
      getAuthorizedAxiosInstance()
        .get(
          `http://localhost:5000/api/users/${getLoggedInuser().id &&
          getLoggedInuser().id}`
        )
        .then((response: AxiosResponse<User>) => {
          let fields: Fields
          const user = Option(response.data)
          if (user.type == 'some') {
            fields = ObjectToArrayExtra<Field, User>(
              user.value,
              (name: string, object: User) => {
                return {
                  name: name,
                  value: Object.create(object)[name],
                  valid: false,
                  validated: false,
                  type: deduceInputType(name)
                }
              }
            )
          } else {
            fields = []
          }
          this.setState({
            ...this.state,
            type: 'editing',
            data: Option(response.data)
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

  handleFieldChange = (field: keyof User) => (value: any) => {
    if (
      this.state.type == 'editing' &&
      this.state.data.type == 'some'
    ) {
      const changedProduct = {
        ...this.state.data.value,
        [field]: value
      }
      this.setState({
        ...this.state,
        type: 'editing',
        data: Option(changedProduct)
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
        return <>Profiel aan het opslaan...</>
      case 'success':
      case 'editing':
        if (
          this.state.type == 'editing' &&
          this.state.data.type != 'none' &&
          isLoggedIn()
        ) {
          return (
            <section className='account container-fluid'>
              <div className='account-inner align-center-vh row'>
                <div className='account-edit-container col-5'>
                  <h3>Account</h3>
                  <div className='form-area personal-info-area'>
                    <form>
                      <p className='form-field e-mail'>
                        <input type='email' placeholder='E-mailadres' value={this.state.data.value.email} onChange={e => this.handleFieldChange('email')(e.target.value)} />
                      </p>
                      <p className='form-field e-mail-confirm'>
                        <input type='email' placeholder='E-mailadres bevestigen' value={this.state.emailConfirm} onChange={e => this.handleFieldChange2('emailConfirm')(e.target.value)} />
                      </p>
                      <div className='form-field-row row'>
                        <p className='form-field first-name col-8'>
                          <input type='text' placeholder='Voornaam' value={this.state.data.value.firstName} onChange={e => this.handleFieldChange('firstName')(e.target.value)} />
                        </p>
                        <p className='form-field prefix col-4'>
                          <input type='text' placeholder='Tussenv.' value={this.state.data.value.prefix} onChange={e => this.handleFieldChange('prefix')(e.target.value)} />
                        </p>
                      </div>
                      <p className='form-field last-name'>
                        <input type='text' placeholder='Achternaam' value={this.state.data.value.lastName} onChange={e => this.handleFieldChange('lastName')(e.target.value)} />
                      </p>
                      <div className='form-field-row row'>
                        <p className='form-field postal-code col-8'>
                          <input type='text' placeholder='Postcode' value={this.state.data.value.postalCode} onChange={e => this.handleFieldChange('postalCode')(e.target.value)} />
                        </p>
                        <p className='form-field building-number col-4'>
                          <input type='number' placeholder='Huisnr.' value={this.state.data.value.buildingNumber} onChange={e => this.handleFieldChange('buildingNumber')(e.target.value)} />
                        </p>
                      </div>
                      <p className='form-field street'>
                        <input type='text' placeholder='Straatnaam' value={this.state.data.value.street} onChange={e => this.handleFieldChange('street')(e.target.value)} />
                      </p>
                      <p className='form-field area'>
                        <input type='text' placeholder='Plaatsnaam' value={this.state.data.value.area} onChange={e => this.handleFieldChange('area')(e.target.value)} />
                      </p>
                      <p className='form-field submit right-align'>
                        <button type='submit' className='btn btn-sm btn-primary'>Gegevens wijzigen</button>
                      </p>
                    </form>
                  </div>
                  <div className='form-area password-area'>
                    <form>
                      <p className='form-field password'>
                        <input type='password' placeholder='Wachtwoord' value={this.state.data.value.password} onChange={e => this.handleFieldChange('password')(e.target.value)} />
                      </p>
                      <p className='form-field password-confirm'>
                        <input type='password' placeholder='Wachtwoord bevestigen' value={this.state.passwordConfirm} onChange={e => this.handleFieldChange2('passwordConfirm')(e.target.value)} />
                      </p>
                      <p className='form-field submit right-align'>
                        <button type='submit' className='btn btn-sm btn-primary'>Wachtwoord wijzigen</button>
                      </p>
                    </form>
                  </div>
                </div>
                <SideBar type='blank' size={3} extraClasses={['height', 'account-side-menu-wrapper']}>
                  <AccountMenuComponent />
                </SideBar>
              </div>
            </section>
          )
        } else {
          return <Redirect to='login' />
        }
    }
  }
}
