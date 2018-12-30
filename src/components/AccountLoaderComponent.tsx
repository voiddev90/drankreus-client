import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import AccountComponent from './AccountComponent';

type Props = RouteComponentProps<{ slug: string }>

export const AccountLoaderComponent: React.SFC<Props> = (props: Props) => {
  switch (props.match.params.slug){
    case 'favourites':
      return <>Favorieten</>
    case 'history':
      return <>Geschiedenis</>
    default:
      return <AccountComponent />
  }
}