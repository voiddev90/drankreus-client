import * as React from 'react';

type Props = {}
type State = {
    name: string
    surname: string
    email: string
    age : string
    gender: string
    emailconfirm: string
    pass: string
    passconfirm: string
    postalcodeletters: string
    postalcodenumbers: string | undefined
    housenumber: string
    street: string
    city: string
    passcheck: boolean
    passIsChecked: boolean
}

export default class SignUpComponent extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
        
        this.state = {
            name: "",
            surname: "",
            age: "",
            gender: "",
            email: "",
            emailconfirm: "",
            pass: "",
            passconfirm: "",
            postalcodeletters: "",
            postalcodenumbers: undefined,
            housenumber: "",
            street: "",
            city: "",
            passcheck: false,
            passIsChecked: false
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleEmailConfirmChange = this.handleEmailConfirmChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSurnameChange = this.handleSurnameChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this)
        this.handlePostalcodeLettersChange = this.handlePostalcodeLettersChange.bind(this)
        this.handlePostalcodeNumbersChange = this.handlePostalcodeNumbersChange.bind(this)
        this.handleStreetChange = this.handleStreetChange.bind(this)
        this.handleCityChange = this.handleCityChange.bind(this)
        this.handleAgeChange = this.handleAgeChange.bind(this)
        this.checkPasswords = this.checkPasswords.bind(this)
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

    handlePostalcodeNumbersChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            postalcodenumbers: event.target.value
        })
    }

    handlePostalcodeLettersChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            postalcodeletters: event.target.value
        })
    }

    handleStreetChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            street: event.target.value
        })
    }

    handleCityChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            city: event.target.value
        })
    }

    handleAgeChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            age: event.target.value
        })
    }

    handleHousenumberChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            housenumber: event.target.value
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

    render(){
        return (
            <div className="signup-form">
                <h2>Registreren</h2>
                <p>Vul hier jouw gegevens in, zodat wij een account voor je kunnen maken.</p>
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
                            <input type="emailconfirm" name="emailconfirm" id="emailconfirm" placeholder="" value={this.state.emailconfirm} onChange={this.handleEmailConfirmChange}/>
                        </p>
                        <p className="signup-pass">
                            <label htmlFor="pass">Wachtwoord (minimaal één hoofdletter en één cijfer)</label>
                            <input type="password" name="pass" id="pass" placeholder="" value={this.state.pass} onChange={this.handlePassChange}/>
                        </p>
                        <p className="signup-passconfirm">
                            <label htmlFor="passconfirm">Herhaal je wachtwoord</label>
                            <input type="password" name="passconfirm" id="passconfirm" placeholder="" value={this.state.passconfirm} onChange={this.handlePassConfirmChange} onBlur={this.checkPasswords}/>
                        </p>
                        
                        <p className="singup-postalcodenumbers">
                            <label htmlFor="postalcodenumbers">Postcode</label>
                            <input type="postalcodenumbers" name="postalcodenumbers" id="postalcodenumbers" placeholder="1234" value={this.state.postalcodenumbers} onChange={this.handlePostalcodeNumbersChange}/>
                            <input type="postalcodeletters" name="postalcodeletters" id="postalcodeletters" placeholder="AB" value={this.state.postalcodeletters} onChange={this.handlePostalcodeLettersChange}/>
                        </p>
                        <p className="singup-postalcodeletters">
                            <label htmlFor="postalcodeletters"/>
                        </p>
                        <p className="singup-housenumber">
                            <label htmlFor="housenumber">Huisnummer</label>
                            <input type="housenumber" name="housenumber" id="housenumber" placeholder="" value={this.state.housenumber} onChange={this.handleHousenumberChange}/>
                        </p>
                        <p className="singup-street">
                            <label htmlFor="street">Straat</label>
                            <input type="street" name="street" id="street" placeholder="" value={this.state.street} onChange={this.handleStreetChange}/>
                        </p>
                        <p className="singup-city">
                            <label htmlFor="city">Stad/dorp</label>
                            <input type="city" name="city" id="city" placeholder="" value={this.state.city} onChange={this.handleCityChange}/>
                        </p>
                        <p className="singup-age">
                            <label htmlFor="age">Leeftijd </label>
                            <input type="age" name="age" id="age" placeholder="DD/MM/JJJJ" value={this.state.age} onChange={this.handleAgeChange}/>
                        </p>


                    </div>
                <div>
                    <button className="submit">Verzenden</button>
                </div>
            </div>
        )
    }
}