import * as React from "react"
import * as ReactDOM from "react-dom"
import { Client } from "./client"
import "./css/index.css"
declare let module: any

ReactDOM.render(<Client />, document.getElementById("react-root"))

if (module.hot) {
  module.hot.accept()
}
