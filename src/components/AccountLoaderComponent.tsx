import * as React from 'react'
import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<{ slug: string }>

export const AccountLoaderComponent: React.SFC<Props> = (props: Props) => {
  switch (props.match.params.slug){
    case 'favourites':
      return <>Favorieten</>
    case 'history':
      return <>Geschiedenis</>
    default:
      return <>Account loader </>
  }
}