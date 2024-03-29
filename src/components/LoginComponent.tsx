import * as React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import * as EmailValidator from 'email-validator'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { LoginResponse, WithPostState } from '../model'
import { handleFieldChange, validateField } from '../helpers'
import { SideBar } from './UI/SideBar';

type Props = {}
type State = WithPostState & {
  email: string
  pass: string
  emailIsValidated: boolean
  emailIsValid: boolean
  passwordIsValidated: boolean
  passwordIsValid: boolean
  redirect: boolean
}

export default class LoginComponent extends React.Component<Props, State> {
  regexChar = /[A-Z]/
  regexNum = /[0-9]/
  handleFieldChange: <T>(field: string) => (value: T) => void
  validateField: (
    field: string,
    extraField?: string
  ) => (predicate: boolean, extraFieldValue?: boolean) => void

  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'editing',
      email: '',
      pass: '',
      emailIsValidated: false,
      emailIsValid: false,
      passwordIsValidated: false,
      passwordIsValid: false,
      redirect: false
    }

    this.handleFieldChange = handleFieldChange.bind(this)
    this.validateField = validateField.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.redirect = this.redirect.bind(this)
  }

  handleLogin() {
    this.setState({ type: 'validating' })
    Axios.post('http://localhost:5000/api/users/login', {
      email: this.state.email,
      password: this.state.pass
    })
      .then((response: AxiosResponse<LoginResponse>) => {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('type', response.data.token_type)
        localStorage.setItem('token', response.data.access_token)
        window.setTimeout(this.redirect, 500)
        this.setState({
          ...this.state,
          type: 'success',
          message: 'Successvol ingelogd'
        })
      })
      .catch((response: AxiosError) => {
        this.setState({
          ...this.state,
          type: 'error',
          error: response.response.data
        })
      })
  }

  redirect() {
    this.setState({ ...this.state, redirect: true })
  }

  render() {
    document.title = 'Drankreus - Inloggen'
    return (
      <section className='login container-fluid'>
        <div className='login-inner row align-center-vh'>
          <div className='login-form-wrapper col-4'>
            <h3>Inloggen</h3>

            <form
              className='login-form'
              onSubmit={e => {
                e.preventDefault()
                this.handleLogin()
              }}
            >
              {this.state.type == 'error' && this.state.error && (
                <p className={this.state.type}>
                  <small>
                    <i>{this.state.error}</i>
                  </small>
                </p>
              )}
              {this.state.type == 'success' && this.state.message && (
                <p className={this.state.type}>
                  <small>
                    <i>{this.state.message}</i>
                  </small>
                </p>
              )}
              {this.state.type == 'validating' && (
                <p className='info'>
                  <small>
                    <i>
                      Aan het inloggen
                    <span>...</span>
                    </i>
                  </small>
                </p>
              )}
              {this.state.redirect && <Redirect to={{ pathname: '/profile' }} />}
              <p className='validText'>
                <input
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='E-mailadres'
                  value={this.state.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleFieldChange('email')(e.target.value)
                  }
                  onBlur={() =>
                    this.validateField('emailIsValid', 'emailIsValidated')(
                      EmailValidator.validate(this.state.email),
                      true
                    )
                  }
                />
              </p>
              <p className='field field-pass'>
                <input
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Wachtwoord'
                  value={this.state.pass}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleFieldChange('pass')(e.target.value)
                  }
                  onBlur={() =>
                    this.validateField('passwordIsValid', 'passwordIsValidated')(
                      this.regexChar.test(this.state.pass) &&
                      this.regexNum.test(this.state.pass),
                      true
                    )
                  }
                />
              </p>
              <button type='submit' className='btn btn-primary btn-sm'>
                Inloggen
            </button>
            </form>
          </div>
          <SideBar type='background-image' size={4}>
            <h4>Nog geen account?</h4>
            <NavLink to='/register' className='btn btn-primary btn-sm'>
              Registreer
          </NavLink>
          </SideBar>
        </div>
      </section>
    )
  }
}
