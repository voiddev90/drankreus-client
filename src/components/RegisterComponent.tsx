import * as React from "react"
import { User } from "../model"
import Axios, { AxiosResponse, AxiosError } from "axios"
import * as EmailValidator from "email-validator"
import '../css/SignUp.css'

type Props = {}
type State = User & {
  emailconfirm: string
  passconfirm: string
  passcheck: boolean
  passIsChecked: boolean
  emailCheck: boolean
  emailIsChecked: boolean
  registered: boolean
  alreadyRegistered: boolean
  error: string
  correctpass: boolean
}

export default class RegisterComponent extends React.Component<Props, State> {
  regexChar = /[A-Z]/
  regexNum = /[0-9]/
  constructor(props: Props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      prefix: '',
      email: '',
      emailconfirm: '',
      password: '',
      passconfirm: '',
      passcheck: false,
      passIsChecked: false,
      emailCheck: false,
      emailIsChecked: false,
      registered: false,
      alreadyRegistered: false,
      error: '',
      admin: false,
      correctpass: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleEmailConfirmChange = this.handleEmailConfirmChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePrefixChange = this.handlePrefixChange.bind(this)
    this.handleSurnameChange = this.handleSurnameChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this)
    this.checkPasswords = this.checkPasswords.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.correctPass = this.correctPass.bind(this)
  }

  correctPass() {
    if (
      this.regexChar.test(this.state.password) &&
      this.regexNum.test(this.state.password)
    ) {
      this.setState({
        ...this.state,
        correctpass: true
      })
    } else {
      this.setState({
        ...this.state,
        correctpass: false
      })
    }
  }

  resetForm() {
    this.setState({
      ...this.state,
      firstName: '',
      prefix: '',
      lastName: '',
      email: '',
      emailconfirm: '',
      password: '',
      passconfirm: '',
      passcheck: false,
      passIsChecked: false,
      emailCheck: false,
      emailIsChecked: false
    })
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      firstName: event.target.value
    })
  }

  handlePrefixChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      prefix: event.target.value
    })
  }

  handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      lastName: event.target.value
    })
  }

  handlePassChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      password: event.target.value
    })
  }

  handlePassConfirmChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      passconfirm: event.target.value
    })
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      email: event.target.value
    })
  }

  handleEmailConfirmChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      emailconfirm: event.target.value
    })
  }

  checkPasswords() {
    if (this.state.password === this.state.passconfirm) {
      this.setState({
        ...this.state,
        passcheck: true,
        passIsChecked: true
      })
    } else {
      this.setState({
        ...this.state,
        passcheck: false,
        passIsChecked: true
      })
    }
  }

  checkEmail() {
    if (this.state.email === this.state.emailconfirm) {
      this.setState({
        ...this.state,
        emailCheck: true,
        emailIsChecked: true
      })
    } else {
      {
        this.setState({
          ...this.state,
          emailCheck: false,
          emailIsChecked: true
        })
      }
    }
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
        this.state.passcheck &&
        this.state.emailCheck &&
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

        const request = Axios.post('http://localhost:5000/auth/register', user)

        request
          .then((value: AxiosResponse) => {
            this.setState({
              ...this.state,
              registered: true
            })
            this.resetForm()
          })
          .catch((reason: AxiosError) => {
            let error = ''
            if (reason.response) {
              switch (reason.response.status) {
                case 409:
                  error = 'Gebruiker bestaat al.'
                  break
                default:
                  error = 'Er is iets foutgegaan bij het registreren.'
              }
            } else {
              error = 'Er is iets foutgegaan bij het registreren.'
            }
            this.setState({
              ...this.state,
              registered: false,
              error: error
            })
          })
      } else {
        this.setState({
          ...this.state,
          registered: false,
          error: 'Email of wachtwoord kloppen niet of komen niet overeen.'
        })
      }
    }
  }

  render() {
    document.title = 'Drankreus - Registreren'
    let wrongpass = null
    if (!this.state.correctpass && this.state.password !== '') {
      wrongpass = (
        <div className="wrongpass-txt">
          Het wachtwoord dat u heeft opgegeven voldoet niet aan de eisen.
        </div>
      )
    }
    return (
      <div className="signup-form">
        <h2>Registreren</h2>
        <p>
          Vul hier uw gegevens in, zodat wij een account voor u kunnen maken.
        </p>
        {this.state.registered && <small>Gebruiker geregistreerd!</small>}
        {this.state.alreadyRegistered && (
          <small>Gebruiker is al geregistreerd.</small>
        )}
        {this.state.error !== '' && <small>{this.state.error}</small>}
        <div className="fields-signup">
          <p className="signup-name">
            <label htmlFor="name">Voornaam</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder=""
              value={this.state.firstName}
              onChange={this.handleNameChange}
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
              onChange={this.handlePrefixChange}
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
              onChange={this.handleSurnameChange}
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
              onChange={this.handleEmailChange}
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
              onChange={this.handleEmailConfirmChange}
              onBlur={this.checkEmail}
            />
          </p>
          <p>{wrongpass}</p>
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
              onChange={this.handlePassChange}
              onBlur={this.correctPass}
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
              onChange={this.handlePassConfirmChange}
              onBlur={this.checkPasswords}
            />
          </p>
        </div>
        <div>
          <button className="submit" onClick={this.onSubmit}>
            Verzenden
          </button>
        </div>
      </div>
    )
  }
}
