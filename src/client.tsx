import * as React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import BaseComponent from './components/BaseComponent';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import HomeComponent from './components/HomeComponent';
import NotFoundComponent from './components/NotFoundComponent';

export type ClientProps = {}
export type ClientState = {}

export default class Client extends React.Component<ClientProps, ClientState> {
    render() {
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
          <Route path="/register" render={() => {
            return (
              <BaseComponent>
                <SignUpComponent />
              </BaseComponent>
            )
          }} />
          <Route exact={true} path="/" render={() => {
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
        )
    }
}