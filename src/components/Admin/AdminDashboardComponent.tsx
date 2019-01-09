import * as React from 'react'
import { MainAdminMenuComponent } from './Menu/MainAdminMenuComponent'
import { Grid } from '@material-ui/core'
import SaleGraphComponent from '../SaleGraphComponent';

type Props = {}

export const AdminDashboardComponent: React.SFC<Props> = (props: Props) => {
  return (
    <section className='admin dashboard'>
      <Grid container spacing={24}>
        <Grid item xs={2}>
          <MainAdminMenuComponent />
        </Grid>
        <Grid item xs={10}>
          <article className='dashboard-content'>
            <h1 className='h1 page-title'>Dashboard</h1>
            <SaleGraphComponent/>
          </article>
        </Grid>
      </Grid>
    </section>
  )
}
