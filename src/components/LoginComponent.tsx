import * as React from "react"
import { NavLink } from "react-router-dom"
import "../css/LoginComponent.css"
import * as EmailValidator from "email-validator"

type Props = {
  loginHandler(username: string, password: string): void
}
type State = {
  email: string
  pass: string
  emailIsValidated: boolean
  emailIsValid: boolean
  passwordIsValidated: boolean
  passwordIsValid: boolean
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
      passwordIsValid: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
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
            this.props.loginHandler(this.state.email, this.state.pass)
          }}
        >
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
            <small>
              {this.state.emailIsValidated && this.state.emailIsValid ? (
                <p>
                  <i>Email adres is valide.</i>
                </p>
              ) : this.state.emailIsValidated && !this.state.emailIsValid ? (
                <p>
                  <i>Email adres is invalide.</i>
                </p>
              ) : null}
            </small>
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
