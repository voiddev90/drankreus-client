import * as React from 'react'
import { RouteComponentProps, Redirect, Switch, Route } from 'react-router'
import { AdminDashboardComponent } from './AdminDashboardComponent'
import { loggedInUserIsAdmin } from '../../helpers'
import { BrowserRouter } from 'react-router-dom'
import AdminProductsOverviewComponent from './Productpanel/AdminProductsOverviewComponent';
import AdminProductEditComponent from './Productpanel/AdminProductEditComponent';
import AdminProductAddComponent from './Productpanel/AdminProductAddComponent';

type Props = {}

export const AdminLoaderComponent: React.SFC<Props> = (props: Props) => {
  if (loggedInUserIsAdmin()) {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/admin/products'
            component={AdminProductsOverviewComponent}
          />
          <Route
            exact
            path='/admin/products/new'
            render={() => <AdminProductAddComponent />}
          />
          <Route
            path='/admin/products/:slug'
            component={AdminProductEditComponent}
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
