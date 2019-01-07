import * as React from 'react'
import {handleFieldChange} from '../helpers'
import Axios, { AxiosResponse, AxiosError } from 'axios';
import { ProductResponse } from '../model';
import { RouteComponentProps, Redirect, withRouter, Route} from 'react-router'
import { Link, NavLink } from 'react-router-dom';
import ProductOverviewComponent from './ProductOverviewComponent';
import MenuItemComponent from './Menu/MenuItemComponent';

type Props = {
}
type State = {
    search: string
    redirect: boolean
    data: ProductResponse
}
export default class SearchComponent extends React.Component<Props,State> {
    handleFieldChange: <T>(field: string) => (value: T) => void
    constructor(props: Props){
        super(props)
        this.state = {
            search: '',
            redirect: true,
            data: null
        }
    this.handleFieldChange = handleFieldChange.bind(this)
    }
    handleOnSubmit(e : any){
        e.preventDefault();
        Axios
        .get(`http://localhost:5000/api/product/Search/?Products=${this.state.search}`)
        .then((value: AxiosResponse<ProductResponse>) =>{
            this.setState({...this.state,redirect: true,data: value.data},()=> console.log(this.state.data))
        })
        .catch((value: AxiosError) =>{
            console.log(`error ${value}`);
        });
        //this.setState({...this.state,redirect:true});
        //localStorage.setItem('products',this.state.search);
        //<button onClick={(e) => this.handleOnSubmit(e)}>Submit</button>
    }
    componentDidMount(){
    }
    render(){
        return(
            <div>
            <form className='search-form'>
              <input
                type='text'
                name='search'
                placeholder='Voer uw zoekterm in en druk op enter...'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleFieldChange('search')(e.target.value)
              }
              />
              <Link to={{
               pathname:`/search/${this.state.search}`,
               state:{test: this.state.search}
              }}> 
              <button >
              <p>Search</p>
           </button></Link>
              </form>
              </div>
        )
    }
}