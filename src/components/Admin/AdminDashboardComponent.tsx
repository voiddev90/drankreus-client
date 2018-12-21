import * as React from 'react'
import { MainAdminMenuComponent } from './menu/MainAdminMenuComponent';

type Props = {}

export const AdminDashboardComponent: React.SFC<Props> = (props: Props) => {
  return (
    <section className='admin dashboard'>
      <MainAdminMenuComponent />
      <article className='dashboard-content'>
        <h1 className='h1 page-title'>Dashboard</h1>
        <p>Hier komen de grafieken.</p>
      </article>
    </section>
  )
}