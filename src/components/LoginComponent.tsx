import * as React from "react"
import { NavLink, Redirect } from "react-router-dom"
import "../css/LoginComponent.css"
import * as EmailValidator from "email-validator"
import Axios, { AxiosResponse, AxiosError } from "axios"
import { LoginResponse } from "../model"

type Props = {}
type State = {
  email: string
  pass: string
  emailIsValidated: boolean
  emailIsValid: boolean
  passwordIsValidated: boolean
  passwordIsValid: boolean
  error: boolean
  redirect: boolean
}

export default class LoginComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      email: "",
      pass: "",
      emailIsValidated: false,
      emailIsValid: false,
      passwordIsValidated: false,
      passwordIsValid: false,
      error: false,
      redirect: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      email: event.target.value
    })
  }

  validateEmail() {
    if (EmailValidator.validate(this.state.email)) {
      this.setState({
        ...this.state,
        emailIsValidated: true,
        emailIsValid: true
      })
    } else {
      this.setState({
        ...this.state,
        emailIsValidated: true,
        emailIsValid: false
      })
    }
  }

  handlePassChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      pass: event.target.value
    })
  }

  handleLogin(email: string, password: string) {
    Axios.post("http://localhost:5000/auth/login", {
      email: email,
      password: password
    })
      .then((response: AxiosResponse<LoginResponse>) => {
        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("token", response.data.access_token)
        this.setState({ ...this.state, redirect: true })
      })
      .catch((response: AxiosError) => {
        this.setState({ ...this.state, error: true })
      })
  }

  render() {
    document.title = "Drankreus - Inloggen"
    return (
      <div className="login">
        <h2>Inloggen</h2>
        <p>Inloggen of een profiel aanmaken.</p>
        <form
          className="e-mail_en_Wachtwoord"
          onSubmit={e => {
            e.preventDefault()
            this.handleLogin(this.state.email, this.state.pass)
          }}
        >
          {this.state.error && (
            <p>
              <small>
                <i>
                  De inloggegevens zijn incorrect of de gebruiker is nog niet
                  geregistreerd.
                </i>
              </small>
            </p>
          )}
          {this.state.redirect && <Redirect to={{pathname: '/'}} />}
          <p className="validText">
            <label htmlFor="email">
              <p>Vul hier uw e-mailadres in </p>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mailadres"
              value={this.state.email}
              onChange={this.handleEmailChange}
              onBlur={this.validateEmail}
            />
          </p>
          <p className="field field-pass">
            <label htmlFor="pass">
              <p>Vul hier uw wachtwoord in </p>
            </label>
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Wachtwoord"
              value={this.state.pass}
              onChange={this.handlePassChange}
            />
          </p>
          <button type="submit" className="button">
            Log in!
          </button>
          <NavLink to="/register" className="button">
            Registreer
          </NavLink>
        </form>
      </div>
    )
  }
}
