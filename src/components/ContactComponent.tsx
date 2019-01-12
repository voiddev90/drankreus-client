import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { checkPropTypes } from 'prop-types'

type Props = {}

export const ContactComponent: React.SFC<Props> = (value: Props) => {
  return (
    <section className='contact-page'>
      <h1 className='contact-title'>Welkom bij onze contactpagina</h1>
      <h4>
        Wij proberen het altijd zo makkelijk en duidelijk mogelijk voor u te
        maken.
      </h4>
      <h4>Als u dan toch nog een vraag heeft, dan helpen wij u graag!</h4>
      <h4>U kunt ons bereiken via e-mail: INFO@drankenreus.com</h4>
      <h4>U kunt ons ook bereiken via het nummer: +44345678903</h4>
    </section>
  )
}
