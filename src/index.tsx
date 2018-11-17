import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Client } from './client'
declare let module: any
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <CookiesProvider>
    <Client />
  </CookiesProvider>,
  document.getElementById('react-root')
)

if (module.hot) {
  module.hot.accept()
}
