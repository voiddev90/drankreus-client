import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router'
import { AdminDashboardComponent } from './AdminDashboardComponent'
import { loggedInUserIsAdmin } from '../../helpers'

type Props = RouteComponentProps<{ slug: string }>

export const AdminLoaderComponent: React.SFC<Props> = (props: Props) => {
  if (loggedInUserIsAdmin()) {
    switch (props.match.params.slug) {
      case 'products':
        return <>Products</>
      case 'users':
        return <>Gebruikers</>
      default:
        return <AdminDashboardComponent />
    }
  } else {
    return <Redirect to='/' />
  }
}
