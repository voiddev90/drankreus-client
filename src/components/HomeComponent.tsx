import * as React from "react"
import { UserLoginState } from "../model";

type Props = {
    loggedInState: UserLoginState
}
type State = {}

export default class HomeComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    document.title = "Drankreus - Home"
    return (
      <section className="home">
        <h1 className="content-title">Welkom bij DrankReus!</h1>
        <p>Wij hebben een alcoholisten korting voor onze leden!</p>
      </section>
    )
  }
}
