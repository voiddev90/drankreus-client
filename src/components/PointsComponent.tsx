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
import { SideBar } from './UI/SideBar';
import { AccountMenuComponent } from './Menu/AccountMenuComponent';

type Props = {}
type PointsState = WithGetState<User>

export default class PointsComponent extends React.Component<Props, PointsState>{
    constructor(props: Props) {
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
                            <section className="points container-fluid">
                                <div className='points-inner row align-center-vh'>
                                    <div className='points-area col-5'>
                                        <h1>Jouw punten</h1>
                                        <p>Op deze pagina kun je het aantal punten zien dat je hebt verdiend. Je verdient punten door bestellingen te plaatsen op onze webshop. Je ontvangt bij elke bestelling een punt en bij 10 punten krijg je 10% korting op je eerstvolgende bestelling.</p>
                                        <div className='points-wrapper'>
                                            <h1 className='user-poinst'>{this.state.data.value.discountPoints}</h1>
                                            <h3 className='total-available'>/10</h3>
                                        </div>
                                    </div>
                                    <SideBar type='blank' size={3} extraClasses={['height', 'account-side-menu-wrapper']}>
                                        <AccountMenuComponent />
                                    </SideBar>
                                </div>
                            </section>
                        )
                }
        }
    }
}