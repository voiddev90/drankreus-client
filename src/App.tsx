import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Base from './componenten/Base'
import LoginComponent from './componenten/LoginComponent';
import NotFoundComponent from './componenten/NotFoundComponent'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={() => {
            return (
              <Base>
                <LoginComponent />
              </Base>
            )
          }} />
          <Route render={() => {
            return (
              <Base>
                <NotFoundComponent />
              </Base>
            )
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
