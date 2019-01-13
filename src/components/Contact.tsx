import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { checkPropTypes } from 'prop-types'
import { SideBar } from './UI/SideBar';

type Props = {}

export const Contact: React.SFC<Props> = (value: Props) => {
  return (
    <section className="contact container-fluid">
      <div className='contact-inner row align-center-vh'>
        <div className='contact-info col-4'>
          <p className='info email'>info@drankreus.nl</p>
          <p className='info phone'>088-4983289</p>
        </div>
        <SideBar type='background-image' size={4}>
          <h1>Contact</h1>
          <p>Wij proberen het altijd zo makkelijk en duidelijk mogelijk voor u te maken.  Als u dan toch een vraag heeft, dan helpen wij u graag!</p>
        </SideBar>
      </div>
    </section>
  )
}
