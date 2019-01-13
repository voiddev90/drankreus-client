import * as React from 'react'
import { RouteComponentProps, Redirect, Switch, Route, Router } from 'react-router'
import { AdminDashboardComponent } from './AdminDashboardComponent'
import { loggedInUserIsAdmin } from '../../helpers'
import { BrowserRouter } from 'react-router-dom'
import AdminProductsOverviewComponent from './Productpanel/AdminProductsOverviewComponent';
import AdminProductEditComponent from './Productpanel/AdminProductEditComponent';
import AdminProductAddComponent from './Productpanel/AdminProductAddComponent';
import AdminUsersOverviewComponent from './Userpanel/AdminUsersOverviewComponent';
import AdminUserEditComponent from './Userpanel/AdminUserEditComponent';
import AdminUserAddComponent from './Userpanel/AdminUserAddComponent';

type Props = RouteComponentProps<{ slug: string }>

export const AdminLoaderComponent: React.SFC<Props> = (props: Props) => {
  if (loggedInUserIsAdmin()) {
    return (
      <Router {...props}>
        <Switch>
          <Route
            exact
            path='/admin/products'
            component={AdminProductsOverviewComponent}
          />
          <Route
            exact
            path='/admin/products/new'
            component={AdminProductAddComponent}
          />
          <Route
            path='/admin/products/:slug'
            component={AdminProductEditComponent}
          />
          <Route
            exact
            path='/admin/users'
            component={AdminUsersOverviewComponent}
          />
          <Route
            exact
            path='/admin/users/new'
            component={AdminUserAddComponent}
          />
          <Route
            exact
            path='/admin/users/:slug'
            component={AdminUserEditComponent}
          />
          <Route component={AdminDashboardComponent} />
        </Switch>
      </Router>
    )
  } else {
    return <Redirect to='/' />
  }
}
