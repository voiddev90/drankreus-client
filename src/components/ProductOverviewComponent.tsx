import * as React from "react"
import { WithDataState, Page, Product, Filter, Option, Tag, ProductResponse } from "../model"
import Axios, { AxiosResponse, AxiosError } from "axios"
import { Map, List } from "immutable"
import { string } from "prop-types"

type ProductOverviewProps = {}
type ProductOverviewState = WithDataState<ProductResponse> & {
  filters: Option<Filter<List<number | string>>>
  perPage: number
  page: number
}

export default class ProductOverviewComponent extends React.Component<
  ProductOverviewProps,
  ProductOverviewState
> {
  constructor(props: ProductOverviewProps) {
    super(props)

    this.state = {
      type: "loading",
      filters: {
        type: "none"
      },
      perPage: 20,
      page: 1
    }
  }

  componentDidMount() {
    Axios.get(`http://localhost:5000/api/products/?page=${this.state.page}&perpage=${this.state.perPage}`)
      .then((value: AxiosResponse<ProductResponse>) => {
        this.setState({...this.state, type:'loaded', data: Option(value.data)})
      })
  }

  render() {
    switch (this.state.type) {
      case "loaded":
        switch (this.state.data.type) {
          case "none":
            return <>geen producten</>
          case "some":
            return <>producten</>
        }
      case "loading":
        return <>loading</>
      case "error":
      default:
        return <>error</>
    }
  }
}
