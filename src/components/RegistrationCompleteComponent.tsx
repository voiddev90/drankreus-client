import * as React from 'react'
import { NavLink } from 'react-router-dom';

type Props = {}
type State = {}

export default class RegistrationCompleteComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    render(){
        return (
    <div className="wrapper">
        <h1 className="title">Gelukt!</h1>
        <p className="registration-complete">We hebben een account voor je aangemaakt! Log in om gebruik te maken</p>
        <NavLink to="/login">Naar login pagina</NavLink>  
    </div>
        )}
}