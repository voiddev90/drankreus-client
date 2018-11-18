import * as React from 'react'
import { Link } from 'react-router-dom'

type Props = {}
type State = {}

export default class BaseComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    document.title = 'DrankReus - Account'
    return (
      <section className='account'>
        <div className='user-info'>
          <img />
          <p className='user-name' />
          <p className='user-mail' />
          <p className='user-points' />
          <div className='last-5 history' />
          <div className='last-5 favourites' />
        </div>
        <div className='account-menu'>
          <Link to='/cart'>Winkelwagen</Link>
          <Link to='/account/favourites'>Favorieten</Link>
          <Link to='/account/history'>Geschiedenis</Link>
        </div>
      </section>
    )
  }
}
