import * as React from 'react'
import { Product } from '../model'
import { fillArray, handleFieldChange, validateField } from '../helpers'

type Props = Product & {
  amount: number
  onDel: (productId: number) => void
  onAdd: (products: number[]) => void
}

type State = {
  amountToAdd: number
}

export class ShoppingCartItemComponent extends React.Component<Props, State> {
  handleFieldChange: <T>(field: string) => (value: T) => void
  validateField: (
    field: string,
    extraField?: string
  ) => (predicate: boolean, extraFieldValue?: boolean) => void

  constructor(props: Props) {
    super(props)

    this.state = {
      amountToAdd: 1
    }

    this.handleFieldChange = handleFieldChange.bind(this)
    this.validateField = validateField.bind(this)
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
          <p>€{props.price}</p>
          <p>Aantal: {props.amount}</p>
          <p>Totaal: €{props.price * props.amount}</p>
          <p>
            <input
              type='number'
              value={this.state.amountToAdd}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleFieldChange('amountToAdd')(e.target.value)
              }
            />
            <button
              type='button'
              onClick={() =>
                props.onAdd(fillArray(this.state.amountToAdd, props.id))
              }
            >
              Toevoegen
            </button>
            <button type='button' onClick={() => props.onDel(props.id)}>
              Verwijderen
            </button>
          </p>
        </main>
      </article>
    )
  }
}
