import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import BaseComponent from './componenten/BaseComponent'
import LoginComponent from './componenten/LoginComponent';
import NotFoundComponent from './componenten/NotFoundComponent'
import HomeComponent from './componenten/HomeComponent';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={() => {
            return (
              <BaseComponent>
                <LoginComponent />
              </BaseComponent>
            )
          }} />
          <Route path="/" render={() => {
            return (
              <BaseComponent>
                <HomeComponent />
              </BaseComponent>
            )
          }} />
          <Route render={() => {
            return (
              <BaseComponent>
                <NotFoundComponent />
              </BaseComponent>
            )
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
