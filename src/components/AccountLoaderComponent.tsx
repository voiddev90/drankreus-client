import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import WishListComponent from './WishListComponent';
import AccountComponent from './AccountComponent';
import PointsComponent from './PointsComponent';

type Props = RouteComponentProps<{ slug: string }>

export const AccountLoaderComponent: React.SFC<Props> = (props: Props) => {
  switch (props.match.params.slug){
    case 'favourites':
      return <WishListComponent/>
    case 'history':
      return <>Geschiedenis</>
    case 'points':
      return <PointsComponent/>
    default:
      return <AccountComponent />
  }
}