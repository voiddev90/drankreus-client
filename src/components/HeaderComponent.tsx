import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { MainMenuComponent } from './Menu/MainMenuComponent';
import SearchComponent from './SearchComponent';

type Props = {}
type State = {}

export default class HeaderComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <header className='site-header'>
        <div className='site-header-wrapper'>
          <div className='site-title-wrapper'>
            <h2 className='site-title'>
              <NavLink to='/'>DrankReus</NavLink>
            </h2>
          </div>
          <div className='search-wrapper'>
            <SearchComponent/>
          </div>
          <MainMenuComponent />
        </div>
      </header>
    )
  }
}
