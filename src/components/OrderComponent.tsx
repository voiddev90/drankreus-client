import * as React from 'react'
import {Link, withRouter,Redirect} from 'react-router-dom';
import { ReactCookieProps, withCookies } from 'react-cookie';
import { Shipment, User } from '../model';
import {handleFieldChange, validateField, isLoggedIn,getLoggedInuser, clearShoppingCart} from '../helpers'
import Axios, { AxiosResponse } from 'axios';

type State = Shipment&{
    step : number
    paymentType: string
    shipmentType: string
    saveUserDetails: boolean
}
class OrderComponent extends React.Component<ReactCookieProps,State> {
     constructor(props: ReactCookieProps){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.state = {
            step: 0,
            paymentType: '',
            shipmentType: '',
            street: '',
            buildingNumber: '',
            postalCode:'',
            area: '',
            saveUserDetails: false
    }
    }
    componentDidMount(){
        if(isLoggedIn()){
            const user:User = getLoggedInuser()
            if(user.buildingNumber != null)
            this.setState({...this.state,
                street:user.street,
                buildingNumber:user.buildingNumber,
                postalCode:user.postalCode,
                area:user.area
            })
        }
    }
    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const key = e.currentTarget.name as keyof string;
        const value = e.currentTarget.value;
        this.setState({...this.state,[key]: value} as any);
    }
    handleOnSubmit(e: any){
        e.preventDefault();
        const shipment: Shipment = {
            street: this.state.street,
            buildingNumber : this.state.buildingNumber,
            postalCode : this.state.postalCode,
            area : this.state.area,
        }
        console.log(shipment);
    }
    processing(){
        /* TODO:
        save user details
        */
       const shoppingCart: number[] = this.props.cookies.get('shopping-cart')
       console.log(shoppingCart);
       const request = Axios.put('http://localhost:5000/api/product/purchased',shoppingCart)
       request.then((value: AxiosResponse) =>{
           console.log(value)
       })
       clearShoppingCart(this.props.cookies);
       this.incr();
    }
    incr(){
        this.setState({...this.state,step: this.state.step + 1});
    }
    render(){
        switch(this.state.step){
            case 0:
        return(
            <div id="shipment-details">
            <p>Gegevens</p>
            <form>
                <input name="street" placeholder= "Straat"  value={this.state.street} onChange={this.handleChange}/><br/>
                <input name="buildingNumber" placeholder= "Huisnummer"  value={this.state.buildingNumber}onChange={this.handleChange}/><br/>
                <input name="postalCode" placeholder= "PostCode"  value={this.state.postalCode}onChange={this.handleChange}/><br/>
                <input name="area" placeholder= "Stad"  value={this.state.area}onChange={this.handleChange}/><br/>
                <button onClick={() => this.incr()}>Submit</button>
            </form>
        </div>
        )
            case 1:
        return( 
        <div id="payment-options">
        <p>Betaal en bezorg-opties</p>
               bezorgen<input type="radio" name="shipmentType" value="bezorgen" onChange={this.handleChange}/><br/>
               ophalen<input type="radio" name="shipmentType" value="ophalen"onChange={this.handleChange}/><br/>
               contant<input type="radio" name="paymentType" value="contant"onChange={this.handleChange} /><br/>
               paypal<input type="radio" name="paymentType" value="paypal"onChange={this.handleChange}/><br/>
               <button onClick={() => this.incr()}>Submit</button>
        </div>)
            case 2:
        return(
            <div id="confirmation">
            <p>Bevestiging</p>
                Uw informatie <br/>
                <label>Straat: {this.state.street}</label> <br/>
                <label>Huisnummer: {this.state.buildingNumber}</label> <br/>
                <label>PostCode: {this.state.postalCode}</label> <br/>
                <label>Stad: {this.state.area}</label> <br/>
                Betaalmethode: <br/>
                <label>{this.state.paymentType}</label> <br/>
                BezorgMethode: <br/>
                <label>{this.state.shipmentType}</label> <br/>
                {isLoggedIn ?
                    <label>Gegevens opslaan<input type="checkbox" checked={this.state.saveUserDetails}
                   onChange={() => this.setState({...this.state, saveUserDetails: !this.state.saveUserDetails})}/></label>
                : ""
                }
                <button onClick={()=>this.processing()}>Betalen</button>
               <button onClick={() => this.setState({...this.state, step: 0})}>Veranderen</button>
            </div>
        )
        case 3:
        return <Redirect to={{ pathname: '/' }}/>
        default:
        return <></>
    }
    }
        
}
export default withCookies(OrderComponent)