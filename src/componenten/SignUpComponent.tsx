import * as React from 'react';
import { User } from '../model';
import Axios, { AxiosResponse } from 'axios';

type Props = {}
type State = {
    name: string
    surname: string
    email: string
    emailconfirm: string
    pass: string
    passconfirm: string
    passcheck: boolean
    passIsChecked: boolean
    emailCheck: boolean
    emailIsChecked: boolean
    registered: boolean
    alreadyRegistered: boolean
    error: string
}

export default class SignUpComponent extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
        
        this.state = {
            name: "Allon",
            surname: "de Veen",
            email: "allondeveen@gmail.com",
            emailconfirm: "allondeveen@gmail.com",
            pass: "Pisvinger5",
            passconfirm: "Pisvinger5",
            passcheck: true,
            passIsChecked: true,
            emailCheck: true,
            emailIsChecked: true,
            registered: false,
            alreadyRegistered: false,
            error: ""
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleEmailConfirmChange = this.handleEmailConfirmChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSurnameChange = this.handleSurnameChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this)
        this.checkPasswords = this.checkPasswords.bind(this)
        this.checkEmail = this.checkEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            name: event.target.value
        })
    }

    handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            surname: event.target.value
        })
    }

    handlePassChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            pass: event.target.value
        })
    }
    
    handlePassConfirmChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            passconfirm: event.target.value
        })
    }

    handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            email: event.target.value
        })
    }

    handleEmailConfirmChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            emailconfirm: event.target.value
        })
    }

    checkPasswords() {
        if (this.state.pass === this.state.passconfirm) {
            this.setState({
                ...this.state,
                passcheck: true,
                passIsChecked: true
            })}
        else    {
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
        if ((this.state.email === "" || this.state.emailCheck) || (this.state.pass === "" || this.state.passcheck) || this.state.name === "" || this.state.surname === "") {
            if (this.state.passcheck && this.state.email === this.state.emailconfirm) {
                const user: User = {
                    Email: this.state.email,
                    Password: this.state.pass,
                    FirstName: this.state.name,
                    LastName: this.state.surname,
                    Admin: false
                }

                console.log("Request verstuurd met body: " + JSON.stringify(user))

                const request = Axios.post("http://localhost:5000/auth/register", user)

                request
                    .then((value: AxiosResponse) => {
                        this.setState({
                            ...this.state,
                            registered: true
                        })
                    })
                    .catch((reason) => {
                        this.setState({
                            ...this.state,
                            error: "Er is iets foutgegegaan bij het registeren: " + JSON.stringify(reason)
                        })
                        console.log(JSON.stringify(reason))
                    })
            } else{
                this.setState({
                    ...this.state,
                    error: "Niet alle velden zijn ingevuld."
                })
            }
        } else {
            this.setState({
                ...this.state,
                error: "Sommige velden zijn nog leeg of kloppen niet."
            })
        }
    }

    render(){
        return (
            <div className="signup-form">
                <h2>Registreren</h2>
                <p>Vul hier jouw gegevens in, zodat wij een account voor je kunnen maken.</p>
                {this.state.registered && <small>Gebruiker geregistreerd!</small>}
                {this.state.alreadyRegistered && <small>Gebruiker is al geregistreerd.</small>}
                {this.state.error !== "" && <small>{this.state.error}</small>}
                    <div className="fields-signup">
                        <p className="signup-name">
                            <label htmlFor="name">Voornaam</label>
                            <input type="name" name="name" id="name" placeholder="" value={this.state.name} onChange={this.handleNameChange}/>
                        </p>
                        <p className="signup-surname">
                            <label htmlFor="surname">Achternaam</label>
                            <input type="surname" name="surname" id="surname" placeholder="" value={this.state.surname} onChange={this.handleSurnameChange}/>
                        </p>
                        <p className="signup-email">
                            <label htmlFor="email">E-mailadres</label>
                            <input type="email" name="email" id="email" placeholder="voorbeeld@voorbeeld.nl" value={this.state.email} onChange={this.handleEmailChange}/>
                        </p>
                        <p className="signup-emailconfirm">
                            <label htmlFor="emailconfirm">Herhaal jouw e-mailadres</label>
                            <input type="emailconfirm" name="emailconfirm" id="emailconfirm" placeholder="" value={this.state.emailconfirm} onChange={this.handleEmailConfirmChange} onBlur={this.checkEmail}/>
                        </p>
                        <p className="signup-pass">
                            <label htmlFor="pass">Wachtwoord (minimaal één hoofdletter en één cijfer)</label>
                            <input type="password" name="pass" id="pass" placeholder="" value={this.state.pass} onChange={this.handlePassChange}/>
                        </p>
                        <p className="signup-passconfirm">
                            <label htmlFor="passconfirm">Herhaal je wachtwoord</label>
                            <input type="password" name="passconfirm" id="passconfirm" placeholder="" value={this.state.passconfirm} onChange={this.handlePassConfirmChange} onBlur={this.checkPasswords}/>
                        </p>


                    </div>
                <div>
                    <button className="submit" onClick={this.onSubmit}>Verzenden</button>
                </div>
            </div>
        )
    }
}