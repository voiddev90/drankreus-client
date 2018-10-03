import * as React from 'react';

type Props = {}
type State = {
    email: string
    pass: string
    emailIsvalidated: boolean
    emailIsValid: boolean
}

export default class LoginComponent extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)

        this.state = {
            email: "",
            pass: "",
            emailIsvalidated: false,
            emailIsValid: false
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
    }

    handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            email: event.target.value
        })
    }

    validateEmail(){
        const reg = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
        if (reg.test(this.state.email)){
            this.setState({
                ...this.state,
                emailIsvalidated: true,
                emailIsValid: true
            })
        } else {
            this.setState({
                ...this.state,
                emailIsvalidated: true,
                emailIsValid: false
            })
        }
    }

    handlePassChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            pass: event.target.value
        })
    }

    render(){
        return (
            <div className="login-form">
                <h2>Inloggen</h2>
                <p>Inloggen of een profiel aanmaken.</p>
                <div className="fields">
                    <p className="field field-email">
                        <small>{(this.state.emailIsvalidated && this.state.emailIsValid) ? "Email adres is valide."
                            : (this.state.emailIsvalidated && !this.state.emailIsValid) ? "Email adres is invalide" : null}</small>
                        <label htmlFor="email">E-mailadres</label>
                        <input type="email" name="email" id="email" placeholder="e-mailadres" value={this.state.email} onChange={this.handleEmailChange} onBlur={this.validateEmail} />
                    </p>
                    <p className="field field-pass">
                        <label htmlFor="pass">Wachtwoord</label>
                        <input type="password" name="pass" id="pass" placeholder="password" value={this.state.pass} onChange={this.handlePassChange} />
                    </p>
                    <button type="submit" className="btn btn-submit btn-primary">Log in!</button>
                    <button type="link" className="btn btn-link btn-primary">Registreer</button>
                </div>
            </div>
        )
    }
}