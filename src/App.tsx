import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginComponent from './componenten/LoginComponent';
import NotFoundComponent from './componenten/NotFoundComponent'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Route component={NotFoundComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
