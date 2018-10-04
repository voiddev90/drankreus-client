import * as React from 'react'
import MainMenuComponent from './MainMenuComponent';

type Props = {}
type State = {}

export default class HeaderComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    render() {
        return (
            <header className="site-header">
                <div className="site-header-wrapper">
                    <div className="site-title-wrapper">
                        <h2 className="site-title">DrankReus</h2>
                    </div>
                    <div className="search-wrapper">
                        <form className="search-form">
                            <input type="text" name="search" placeholder="Zoekterm" />
                            <button type="submit">Zoek</button>
                        </form>
                    </div>
                    <div className="main-menu-wrapper">
                        <MainMenuComponent />
                    </div>
                </div>
            </header>
        )
    }
}