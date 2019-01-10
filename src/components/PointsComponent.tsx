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

type Props = {}
type PointsState = WithGetState<User>

export default class PointsComponent extends React.Component<Props, PointsState>{
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

    render(){
        document.title = "Drankreus - Pagina niet gevonden"
        switch (this.state.type) {
            case 'loading':
              return <>Jouw bonuspunten worden opgehaald</>
            case 'error':
              return <>Er ging iets fout</>
            case 'loaded':
              switch (this.state.data.type) {
                case 'none':
                  return <>Er ging iets fout</>
                case 'some':
                console.log(this.state.data)
                    return (
                        <div className="points">
                            <p>Op deze pagina kun je het aantal punten zien dat je hebt verdiend. Je verdient punten door bestellingen te plaatsen op onze webshop. Je ontvangt bij elke bestelling een punt en bij 10 punten krijg je 10% korting op je eerstvolgende bestelling.</p>
                            <h3>Jouw aantal punten:</h3>
                            <h1>{this.state.data.value.discountPoints}</h1>
                        </div>
        )
    }
}
    }}