import * as React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { User, WithPostState } from '../model'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import * as EmailValidator from 'email-validator'
import { handleFieldChange, validateField } from '../helpers'

type Props = {}
type State = WithPostState &
  User & {
    emailconfirm: string
    emailIsValid: boolean
    emailIsValidated: boolean
    emailMatch: boolean
    emailIsMatched: boolean
    passconfirm: string
    passwordIsValid: boolean
    passwordIsValidated: boolean
    passwordMatch: boolean
    passwordIsMatched: boolean
    registered: boolean
  }

export default class RegisterComponent extends React.Component<Props, State> {
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
      firstName: '',
      lastName: '',
      prefix: '',
      email: '',
      emailconfirm: '',
      emailIsValid: false,
      emailIsValidated: false,
      emailMatch: false,
      emailIsMatched: false,
      password: '',
      passconfirm: '',
      passwordIsValid: false,
      passwordIsValidated: false,
      passwordMatch: false,
      passwordIsMatched: false,
      registered: false,
      admin: false
    }

    this.handleFieldChange = handleFieldChange.bind(this)
    this.validateField = validateField.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  resetForm() {
    this.setState({
      ...this.state,
      type: 'editing',
      firstName: '',
      lastName: '',
      prefix: '',
      email: '',
      emailconfirm: '',
      emailIsValid: false,
      emailIsValidated: false,
      emailMatch: false,
      emailIsMatched: false,
      password: '',
      passconfirm: '',
      passwordIsValid: false,
      passwordIsValidated: false,
      passwordMatch: false,
      passwordIsMatched: false
    })
  }

  onSubmit() {
    if (
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.firstName === '' ||
      this.state.lastName === ''
    ) {
      this.setState({
        ...this.state,
        registered: false,
        error: 'Sommige velden zijn nog leeg.'
      })
    } else {
      if (
        this.state.passwordIsValid &&
        this.state.emailIsValid &&
        EmailValidator.validate(this.state.email)
      ) {
        const user: User = {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          admin: false
        }
        if (this.state.prefix !== '') user.prefix = this.state.prefix

        const request = Axios.post('http://localhost:5000/api/users/', user)

        this.setState({ ...this.state, type: 'creating' })

        request
          .then((value: AxiosResponse) => {
            this.setState({
              ...this.state,
              type: 'success',
              registered: true
            })
            this.resetForm()
          })
          .catch((reason: AxiosError) => {
            let error = ''
            if (reason.response.data) {
              error = reason.response.data
            } else {
              error = 'Er is iets foutgegaan bij het registreren.'
            }
            this.setState({
              ...this.state,
              type: 'error',
              registered: false,
              error: error
            })
          })
      } else {
        this.setState({
          ...this.state,
          type: 'error',
          registered: false,
          error: 'Email of wachtwoord kloppen niet of komen niet overeen.'
        })
      }
    }
  }

  render() {
    document.title = 'Drankreus - Registreren'
    return (
      <div className='signup-form'>
        <h2>Registreren</h2>
        <p>
          Vul hier uw gegevens in, zodat wij een account voor u kunnen maken.
        </p>
        {this.state.registered && <small>Gebruiker geregistreerd!</small>}
        {this.state.type == 'error' && this.state.error && (
          <small>{this.state.error}</small>
        )}
        {this.state.type == 'success' && this.state.message && (
          <small>{this.state.message}</small>
        )}
        <div className='fields-signup'>
          <p className='signup-name'>
            <p>Vul hier uw naam in</p>
            <label htmlFor='name' />
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Voornaam'
              value={this.state.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleFieldChange('firstName')(e.target.value)
              }
            />
          </p>
          <p className='signup-prefix'>
            <label htmlFor='name' />
            <input
              type='text'
              name='prefix'
              id='prefix'
              placeholder='Tussenvoegsel'
              value={this.state.prefix}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleFieldChange('prefix')(e.target.value)
              }
            />
          </p>
          <p className='signup-surname'>
            <label htmlFor='surname' />
            <input
              type='text'
              name='surname'
              id='surname'
              placeholder='Achternaam'
              value={this.state.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleFieldChange('lastName')(e.target.value)
              }
            />
          </p>
          <p className='signup-email'>
            <p>Vul hier uw e-mailadres in</p>
            <label htmlFor='email' />
            <input
              type='email'
              name='email'
              id='email'
              placeholder='voorbeeld@voorbeeld.nl'
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
          <p className='signup-emailconfirm'>
            <p>Herhaal uw e-mailadres</p>
            <label htmlFor='emailconfirm' />
            <input
              type='email'
              name='emailconfirm'
              id='emailconfirm'
              placeholder='voorbeeld@voorbeeld.nl'
              value={this.state.emailconfirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleFieldChange('emailconfirm')(e.target.value)
              }
              onBlur={() =>
                this.validateField('emailMatch', 'emailIsMatched')(
                  this.state.email === this.state.emailconfirm,
                  true
                )
              }
            />
          </p>
          <p className='signup-pass'>
            <p>
              Vul hier uw Wachtwoord in (minimaal één hoofdletter en één cijfer)
            </p>
            <label htmlFor='pass' />
            <input
              type='password'
              name='pass'
              id='pass'
              placeholder='DrankReus01'
              value={this.state.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleFieldChange('password')(e.target.value)
              }
              onBlur={() =>
                this.validateField('passwordIsValid', 'passwordIsValidated')(
                  this.regexChar.test(this.state.password) &&
                    this.regexNum.test(this.state.password),
                  true
                )
              }
            />
          </p>
          <p className='signup-passconfirm'>
            <p>Herhaal uw wachtwoord</p>
            <label htmlFor='passconfirm' />
            <input
              type='password'
              name='passconfirm'
              id='passconfirm'
              placeholder='DrankReus01'
              value={this.state.passconfirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleFieldChange('passconfirm')(e.target.value)
              }
              onBlur={() =>
                this.validateField('passwordMatch', 'passwordIsMatched')(
                  this.state.password == this.state.passconfirm,
                  true
                )
              }
            />
          </p>
        </div>
        <div>
          <button className='submit' onClick={this.onSubmit}>
            Meldt u nu aan
          </button>
          <NavLink to='/login' className='button-regstr'>
            Al een account?
          </NavLink>
        </div>
      </div>
    )
  }
}
