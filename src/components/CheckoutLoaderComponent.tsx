import * as React from 'react'
import { ReactCookieProps, Cookies } from 'react-cookie'
import { RouteComponentProps } from 'react-router'
import OrderComponent from './OrderComponent';
import { Shipment } from '../model';
import {handleFieldChange, validateField, isLoggedIn,getLoggedInuser} from '../helpers'

type Props = RouteComponentProps<{ slug: string }>
/*
 * De routes / stappen zullen zijn (in juiste volgorde): order (gegevens invullen als die er nog niet zijn, 
 * eventueel adres selecteren als hij er meerdere heeft, verzendmethode etc.), samenvatting, betaling, bevestiging. In het engels :P
 */

export const CheckoutLoaderComponent: React.SFC<Props> = props => {
  switch (props.match.params.slug) {
    case 'order':
      return <OrderComponent/>
    case 'payment':
      return <div></div>
    case 'confirm':
      return <>bevestiging</>
    default:
      return <></>
  }
}
