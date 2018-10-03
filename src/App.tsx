import * as React from 'react';
import LoginComponent from './componenten/login/LoginComponent';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
