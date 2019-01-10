import * as React from 'react'
import { Product } from '../../model'
import { fillArray, handleFieldChange } from '../../helpers'

type Props = Product & {
  amount: number
  onDel?: (productId: number) => void
  onAdd?: (products: number[]) => void
  allowEdits?: boolean
}

type State = {
  amountToAdd: number
}

export class ShoppingCartItemComponent extends React.Component<Props, State> {
  handleFieldChange: <T>(field: string) => (value: T) => void

  constructor(props: Props) {
    super(props)

    this.state = {
      amountToAdd: 1
    }

    this.handleFieldChange = handleFieldChange.bind(this)
  }
  render() {
    const props = this.props
    return (
      <article className='cart-item'>
        <header className='image-wrapper'>
          <img src={props.url} />
        </header>
        <main className='content'>
          <h5 className='title'>{props.name}</h5>
          <p>€{props.price.toFixed(2)}</p>
          <p>Aantal: {props.amount}</p>
          <p>Totaal: €{(props.price * props.amount).toFixed(2)}</p>
          
            {this.props.allowEdits ? <p>
            <input
              type='number'
              value={this.state.amountToAdd}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = +e.target.value < 1 ? 1 : e.target.value
                this.handleFieldChange('amountToAdd')(newValue)
              }}
            /><button type='button'
              onClick={() =>
                props.onAdd(fillArray(this.state.amountToAdd)(props.id))
              }> Toevoegen</button> 
              <button type='button' onClick={() => props.onDel(props.id)}>
              Verwijderen
            </button> </p>
            : <div></div>}
        </main>
      </article>
    )
  }
}
