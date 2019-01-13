import * as React from 'react'
import { AxiosResponse, AxiosError } from 'axios'
import {
  getLoggedInuser,
  isLoggedIn
} from '../helpers'
import { Redirect } from 'react-router'
import {
  User,
  Option,
  getAuthorizedAxiosInstance,
  WithGetState
} from '../model'
import { NavLink } from "react-router-dom"

type Props = {}
type State = WithGetState<User>


export default class NotFoundComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)

        this.state = {
            type: 'loading'
        }

        this.getData = this.getData.bind(this)
    }

    getData() {
        if (isLoggedIn())
        getAuthorizedAxiosInstance().get(`http://localhost:5000/api/users/${getLoggedInuser().id}`
        )
        .then((value: AxiosResponse<User>) => {
            this.setState({
            ...this.state,
            type: 'loaded',
            data: Option(value.data)
            })
        })
        .catch((value: AxiosError) => {
            this.setState({
            ...this.state,
            type: 'error',
            reason: value.response.status
            })
        })
    }
componentDidMount() {
    this.getData()
}

    render() {
        document.title = "Drankreus - Pagina niet gevonden"
        switch (this.state.type) {
            case 'loading':
              return <>Pagina wordt geladen...</>
            case 'error':
              return <>Er ging iets fout</>
            case 'loaded':
              switch (this.state.data.type) {
                case 'none':
                  return <>Er ging iets fout</>
                case 'some':
        return (
        <div>
            <h2>Gelukt!</h2>
            <p>Jouw nieuwe puntenaantal is <h1>{this.state.data.value.discountPoints}</h1></p>
            <p>Je bestelling is voltooid. Druk op de onderstaande knoppen om terug te gaan naar de homepagina of naar de productpagina.</p>
            <NavLink to='/'>
            <button>Home</button>
            </NavLink>
            <NavLink to='/products'>
            <button>Producten</button>
            </NavLink>
        </div>
    )
}
}
    }}