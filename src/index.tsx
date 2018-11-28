import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Client from './client'
declare let module: any
import { CookiesProvider } from 'react-cookie'
import { Provider, connect} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
    <Client />
    </Provider>
  </CookiesProvider>,
  document.getElementById('react-root')
)

if (module.hot) {
  module.hot.accept()
}
