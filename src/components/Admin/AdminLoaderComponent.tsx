import * as React from 'react'
import { RouteComponentProps, Redirect, Switch, Route } from 'react-router'
import { AdminDashboardComponent } from './AdminDashboardComponent'
import { loggedInUserIsAdmin } from '../../helpers'
import { BrowserRouter } from 'react-router-dom'

type Props = RouteComponentProps<{ slug: string }>

export const AdminLoaderComponent: React.SFC<Props> = (props: Props) => {
  if (loggedInUserIsAdmin()) {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/admin/products'
            render={() => <>Productenlijst</>}
          />
          <Route
            exact
            path='/admin/products/new'
            render={() => <>Nieuw product</>}
          />
          <Route
            exact
            path='/admin/users'
            render={() => <>Gebruikerslijst</>}
          />
          <Route
            exact
            path='/admin/users/new'
            render={() => <>Nieuwe gebruiker</>}
          />
          <Route component={AdminDashboardComponent} />
        </Switch>
      </BrowserRouter>
    )
  } else {
    return <Redirect to='/' />
  }
}
