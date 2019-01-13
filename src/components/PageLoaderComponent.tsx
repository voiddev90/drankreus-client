import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router'
import LoginComponent from './LoginComponent'
import NotFoundComponent from './NotFoundComponent'
import { isLoggedIn } from '../helpers'
import RegisterComponent from './RegisterComponent'
import { Contact } from './Contact'
import AccountComponent from './AccountComponent'
import ShoppingCartComponent from './ShoppingCartComponent'
import ProductOverviewComponent from './ProductOverviewComponent';
import { AdminDashboardComponent } from './Admin/AdminDashboardComponent';
import { AdminLoaderComponent } from './Admin/AdminLoaderComponent';

type Props = RouteComponentProps<{ 
  slug: string }> 


export const PageLoaderComponent: React.SFC<Props> = (props: Props) => {
  switch (props.match.params.slug) {
    case 'login':
      return isLoggedIn() ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <LoginComponent />
      )
    case 'contact':
      return <Contact />
    case 'register':
      return isLoggedIn() ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <RegisterComponent />
      )
    case 'profile':
      return <AccountComponent />
    case 'cart':
      return <ShoppingCartComponent />
    case 'products':
        return <ProductOverviewComponent/>
    default:
      return <NotFoundComponent />
  }
}
