import * as React from 'react'
import { MainAdminMenuComponent } from '../Menu/MainAdminMenuComponent'
import {
  WithGetState,
  ProductResponse,
  getAuthorizedAxiosInstance,
  Option,
  Product,
  UserResponse,
  User
} from '../../../model'
import { AxiosResponse, AxiosError } from 'axios'
import { PaginationComponent } from '../../PaginationComponent'
import AdminUserComponent from './AdminUserComponent'
import { Grid } from '@material-ui/core'
import { AdminUserSubMenuComponent } from '../Menu/AdminUsersSubMenuComponent';

type Props = {}
type State = WithGetState<User[]>

export default class AdminUsersOverviewComponent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'loading'
    }

    this.renderState = this.renderState.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    getAuthorizedAxiosInstance()
      .get(`users`)
      .then((response: AxiosResponse<User[]>) => {
        this.setState({
          ...this.state,
          type: 'loaded',
          data: Option(response.data)
        })
      })
      .catch((error: AxiosError) => {
        this.setState({
          ...this.state,
          type: 'error'
        })
      })
  }

  renderState() {
    switch (this.state.type) {
      case 'loading':
        return <>Loading</>
      default:
      case 'error':
        return <>Fout bij het laden van de gebruikers</>
      case 'loaded':
        switch (this.state.data.type) {
          default:
          case 'none':
            return <>Geen gebruikers gevonden</>
          case 'some':
            return (
              <>
                <>
                  {this.state.data.value.map((user: User) => (
                    <AdminUserComponent user={user} />
                  ))}
                </>
              </>
            )
        }
    }
  }

  render() {
    return (
      <section className='admin products'>
        <Grid container>
          <Grid item xs={2}>
            <MainAdminMenuComponent />
          </Grid>
          <Grid item xs={2}>
            <AdminUserSubMenuComponent />
          </Grid>
          <Grid item xs={8}>
            <article className='content'>
              <h1 className='h1 page-title'>Gebruikers</h1>
              {this.renderState()}
            </article>
          </Grid>
        </Grid>
      </section>
    )
  }
}
