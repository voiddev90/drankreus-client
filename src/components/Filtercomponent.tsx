import * as React from 'react'
import { handleFieldChange } from '../helpers'

type Props = {}
type State = {
  FilterString: string
  AlcoholMax: number
  AlcoholMin: number
  PriceMin: number
  PriceMax: number
}

export default class FilterComponent extends React.Component<Props, State> {
  handleFieldChange: <T>(field: string) => (value: T) => void
  constructor(props: Props) {
    super(props)

    this.state = {
      FilterString: '',
      AlcoholMax: 100,
      AlcoholMin: 0,
      PriceMin: 0,
      PriceMax: 9999
    }

    this.handleFieldChange = handleFieldChange.bind(this)
  }

  render() {
    return (
      <div className='filter-container'>
        <h1>Alcoholpercentage (%)</h1>
        <input
          type='number'
          name='alcoholfiltermax'
          value=''
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.handleFieldChange('AlcoholMin')(e.target.value)
          }
        >
          min
        </input>
        <input
          type='number'
          name='alcoholfiltermax'
          value=''
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.handleFieldChange('AlcoholMax')(e.target.value)
          }
        >
          max
        </input>
        <h1>Prijs (€)</h1>
        <input
          type='number'
          name='prijsfiltermin'
          value=''
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.handleFieldChange('PriceMin')(e.target.value)
          }
        >
        min
        </input>
        <input
          type='number'
          name='prijsfiltermax'
          value=''
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.handleFieldChange('PriceMax')(e.target.value)
          }
        >
        max
        </input>
      </div>
    )
  }
}
