import * as React from "react";
import { NavLink } from "react-router-dom";
import "../css/LoginComponent.css";

type Props = {};
type State = {
  email: string;
  pass: string;
  emailIsvalidated: boolean;
  emailIsValid: boolean;
};

export default class LoginComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      pass: "",
      emailIsvalidated: false,
      emailIsValid: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  }

  validateEmail() {
    const reg = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (reg.test(this.state.email)) {
      this.setState({
        ...this.state,
        emailIsvalidated: true,
        emailIsValid: true
      });
    } else {
      this.setState({
        ...this.state,
        emailIsvalidated: true,
        emailIsValid: false
      });
    }
  }

  handlePassChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      pass: event.target.value
    });
  }

  render() {
    return (
      <div className="login">
        <h2>Inloggen</h2>
        <p>Inloggen of een profiel aanmaken.</p>
        <form className="e-mail_en_Wachtwoord">
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
              {this.state.emailIsvalidated && this.state.emailIsValid ? (
                <p>
                  <i>Email adres is valide.</i>
                </p>
              ) : this.state.emailIsvalidated && !this.state.emailIsValid ? (
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
    );
  }
}
