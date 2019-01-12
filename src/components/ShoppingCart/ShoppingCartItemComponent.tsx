import * as React from 'react'
import { Product } from '../../model'
import { fillArray, handleFieldChange, removeAllItemsOfProduct } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = Product & {
  amount: number
  onDel?: (productId: number) => void
  onChange?: (product: number, products: number[]) => void
  deleteAllItemsOfProduct?: (product: number) => void
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
      <tr className='shopping-cart-item'>
        <td className='image'><img src={props.url} /></td>
        <td className='name' colSpan={4}>{props.name}</td>
        <td className='price'>€{props.price}</td>
        <td className='amount'>
          <form className='amount-form'>
            <input type='number' onChange={(e) => {
              if (parseInt(e.target.value) != 0) {
                const newProducts: number[] = fillArray(parseInt(e.target.value))(props.id)
                props.onChange && this.props.onChange(props.id, newProducts)
              } else {
                props.deleteAllItemsOfProduct && props.deleteAllItemsOfProduct(props.id)
              }
            }} value={props.amount} />
          </form>
        </td>
        <td className='delete'><button type='button' className='btn btn-link' onClick={() => props.onDel(props.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
      </tr>
    )
  }
}
