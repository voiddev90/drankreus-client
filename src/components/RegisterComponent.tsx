import * as React from 'react'
import { User, WithPostState } from '../model'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import * as EmailValidator from 'email-validator'
import { handleFieldChange, validateField } from '../helpers'
import { SideBar } from './UI/SideBar';
import { NavLink } from 'react-router-dom';

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
              error = reason.response.data;
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
      <section className='login container-fluid'>
        <div className='login-inner row'>
          <div className="signup-form col-4">
            <h2>Registreren</h2>
            <p>
              Vul hier uw gegevens in, zodat wij een account voor u kunnen maken.
        </p>
            {this.state.registered && <small>Gebruiker geregistreerd!</small>}
            {this.state.type == 'error' &&
              this.state.error && <small>{this.state.error}</small>}
            {this.state.type == 'success' &&
              this.state.message && <small>{this.state.message}</small>}
            <div className="fields-signup">
              <p className="signup-name">
                <label htmlFor="name">Voornaam</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=""
                  value={this.state.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleFieldChange('firstName')(e.target.value)
                  }
                />
              </p>
              <p className="signup-prefix">
                <label htmlFor="name">Tussenvoegsel</label>
                <input
                  type="text"
                  name="prefix"
                  id="prefix"
                  placeholder=""
                  value={this.state.prefix}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleFieldChange('prefix')(e.target.value)
                  }
                />
              </p>
              <p className="signup-surname">
                <label htmlFor="surname">Achternaam</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder=""
                  value={this.state.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleFieldChange('lastName')(e.target.value)
                  }
                />
              </p>
              <p className="signup-email">
                <label htmlFor="email">E-mailadres</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="voorbeeld@voorbeeld.nl"
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
              <p className="signup-emailconfirm">
                <label htmlFor="emailconfirm">Herhaal uw e-mailadres</label>
                <input
                  type="email"
                  name="emailconfirm"
                  id="emailconfirm"
                  placeholder="voorbeeld@voorbeeld.nl"
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
              <p className="signup-pass">
                <label htmlFor="pass">
                  Wachtwoord (minimaal één hoofdletter en één cijfer)
            </label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  placeholder=""
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
              <p className="signup-passconfirm">
                <label htmlFor="passconfirm">Herhaal uw wachtwoord</label>
                <input
                  type="password"
                  name="passconfirm"
                  id="passconfirm"
                  placeholder=""
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
              <button className="submit" onClick={this.onSubmit}>
                Verzenden
          </button>
            </div>
          </div>
          <SideBar type='blank' size={4} >
            <h4>Al een account?</h4>
            <p><NavLink to='/login' className='btn btn-primary btn-sm'>Inloggen</NavLink></p>
          </SideBar>
        </div>
      </section>
    )
  }
}
