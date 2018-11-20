import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { checkPropTypes } from 'prop-types'

type Props = {}

export const Contact: React.SFC<Props> = (value: Props) => {
  return (
    <section className="contact-page">
      <h1 className="contact-title">Welkom bij onze contact pagina</h1>
      <p> Voor vragen kunt u een email sturen naar ...</p>
      <p> of u kunt ons via de telefoon bereiken via ...</p>
    </section>
  )
}
