import * as React from 'react'
import { ReactCookieProps } from 'react-cookie'
import { RouteComponentProps } from 'react-router'

type Props = RouteComponentProps<{ slug: string }>

/*
 * De routes / stappen zullen zijn (in juiste volgorde): order (gegevens invullen als die er nog niet zijn, eventueel adres selecteren als hij er meerdere heeft, verzendmethode etc.), samenvatting, betaling, bevestiging. In het engels :P
 */

export const CheckoutLoaderComponent: React.SFC<Props> = props => {
  switch (props.match.params.slug) {
    case 'order':
      return <>Bestelling</>
    default:
      return <></>
  }
}
