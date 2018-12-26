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
import Select from 'react-select/lib/Select'
import { ActionMeta, InputActionMeta } from 'react-select/lib/types'

type Props<T> = {
  endpoint: Endpoint
  getId: (item: T) => number
  getName: (item: T) => string
  onChange: (item: T) => void
  placeholder: string
  multiple?: boolean
  default: T
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
                isMulti={this.props.multiple}
                isSearchable
                isClearable
                options={options}
                placeholder={this.props.placeholder}
                onInputChange={(newValue: string) =>
                  this.setState({ ...this.state, searchTerm: newValue })
                }
                onMenuOpen={() =>
                  this.setState({ ...this.state, menuOpen: true })
                }
                onMenuClose={() =>
                  this.setState({ ...this.state, menuOpen: false })
                }
                menuIsOpen={this.state.menuOpen}
                onChange={value => this.props.onChange(value as T)}
                getOptionLabel={option => this.props.getName(option)}
                value={this.props.default}
              />
            )
        }
    }
  }
}

export class AddBrandComponent extends AddCategoryComponent<Brand> {}
export class AddCountryComponent extends AddCategoryComponent<Country> {}
