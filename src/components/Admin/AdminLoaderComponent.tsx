import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import { AdminDashboardComponent } from './AdminDashboardComponent';

type Props = RouteComponentProps<{ slug: string }>

export const AdminLoaderComponent: React.SFC<Props> = (props: Props) => {
  switch (props.match.params.slug){
    case 'products':
      return <>Products</>
    case 'users':
      return <>Gebruikers</>
    default:
      return <AdminDashboardComponent />
  }
}