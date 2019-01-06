import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { checkPropTypes } from 'prop-types'

type Props = {}

export const Contact: React.SFC<Props> = (value: Props) => {
  return (
    <section className='contact-page'>
      <h1 className='contact-title'>Welkom bij onze contactpagina</h1>
      <p> Voor vragen kunt u een email sturen naar: drankenreus@gmail.nl</p>
      <p> U kunt ons via de telefoon bereiken met het nummer: 06 12345678</p>
    </section>
  )
}
