import * as React from 'react'
import {
  WithGetState,
  getAuthorizedAxiosInstance,
  Option,
  Endpoint,
  Brand,
  Country
} from '../../../model'
import { AxiosResponse } from 'axios'
import Select from 'react-select'
import { ActionMeta, InputActionMeta } from 'react-select/lib/types'

type Props<T> =
| {
  onChange: (item: T) => void
  multiple: false
  endpoint: Endpoint
  getId: (item: T) => number
  getName: (item: T) => string
  placeholder: string
  default: T
}
| {
  onChange: (item: T[]) => void
  multiple: true
  endpoint: Endpoint
  getId: (item: T) => number
  getName: (item: T) => string
  placeholder: string
  default: T[]
}

type State<T> = WithGetState<T> & {
  menuOpen: boolean
  searchTerm: string
}

export default class AddCategoryComponent<T> extends React.Component<
  Props<T>,
  State<Array<T>>
  > {
  constructor(props: Props<T>) {
    super(props)

    this.state = {
      type: 'loading',
      menuOpen: false,
      searchTerm: ''
    }
  }

  getData() {
    getAuthorizedAxiosInstance()
      .get(this.props.endpoint)
      .then((response: AxiosResponse<Array<T>>) => {
        this.setState({
          ...this.state,
          type: 'loaded',
          data: Option(response.data)
        })
      })
      .catch(_ => {
        this.setState({
          ...this.state,
          type: 'error'
        })
      })
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUpdate(prevProps: Props<T>) {
    if (prevProps.endpoint != this.props.endpoint) {
      this.getData()
    }
  }

  render() {
    switch (this.state.type) {
      case 'error':
        return <>Error</>
      case 'loading':
        return <>Loading</>
      case 'loaded':
        switch (this.state.data.type) {
          case 'none':
            return <>Geen items gevonden</>
          case 'some':
            const options = this.state.data.value
            return (
              <Select
                isSearchable
                isClearable
                options={options}
                getOptionLabel={option => this.props.getName(option)}
                getOptionValue={option => this.props.getName(option)}
                value={this.props.default}
                onChange={value => {
                  if (this.props.multiple) {
                    this.props.onChange(value as T[])
                  } else if (this.props.multiple == false) {
                    this.props.onChange(value as T)
                  }
                }}
                isMulti={this.props.multiple}
                placeholder={this.props.placeholder}
              />
            )
        }
    }
  }
}

export class AddBrandComponent extends AddCategoryComponent<Brand> { }
export class AddCountryComponent extends AddCategoryComponent<Country> { }
