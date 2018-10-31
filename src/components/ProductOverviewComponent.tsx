import * as React from "react"
import {
  WithDataState,
  Page,
  Product,
  Filter,
  Option,
  Tag,
  ProductResponse
} from "../model"
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
      type: "loaded",
      data: {
        type: 'some',
        value: {
          products: {
            itemsPerPage: 20,
            totalPages: 1,
            index: 1,
            items: List<Product>(
              [
                {id: 1, name: 'Smirnoff Vodka', price: 12.50, volume: 0.7, alcoholpercentage: 40.0},
                {id: 2, name: 'Absolut Vodka', price: 16.00, volume: 0.7, alcoholpercentage: 40.0},
                {id: 3, name: 'Sonnema Berenburg', price: 14.00, volume: 0.7, alcoholpercentage: 35.0},
                {id: 4, name: 'Cato Negro Chardonnay', price: 3.50, volume: 0.7, alcoholpercentage: 12.5},
                {id: 5, name: 'Heineken Pilsener Krat', price: 15.00, volume: 7.2, alcoholpercentage: 5.0},
                {id: 6, name: 'Grey Goose Vodka', price: 37.50, volume: 1.0, alcoholpercentage: 40.0},
                {id: 7, name: 'Belvedere Vodka', price: 36.50, volume: 0.7, alcoholpercentage: 40.0},
                {id: 8, name: 'Bacardi Carta Blanca', price: 15.99, volume: 1.0, alcoholpercentage: 37.50},
                {id: 9, name: 'Rocketshot', price: 9.99, volume: 0.7, alcoholpercentage: 14.0},
                {id: 10, name: 'Jägermeister', price: 17.99, volume: 0.7, alcoholpercentage: 37.5},
                {id: 11, name: 'Sierra Tequila', price: 15.99, volume: 1.0, alcoholpercentage: 40.0},
                {id: 12, name: 'Bols Gold Strike', price: 14.99, volume: 0.5, alcoholpercentage: 30.0},
                {id: 13, name: 'Fireman', price: 12.00, volume: 0.7, alcoholpercentage: 40},
                {id: 14, name: 'Stroh 80', price: 19.99, volume: 0.7, alcoholpercentage: 80.0},
                {id: 15, name: 'Johnny Walker Red Label', price: 21.99, volume: 0.7, alcoholpercentage: 37.5},
                {id: 16, name: 'Johnny Walker Black Label', price: 23.00, volume: 0.7, alcoholpercentage: 40.0},
                {id: 17, name: 'Bacardi Razz', price: 15.99, volume:  0.7, alcoholpercentage: 37.5},
                {id: 18, name: 'Gordons Dry Gin', price: 17.99, volume: 1.0, alcoholpercentage: 40},
                {id: 19, name: 'Famous Grouse Scottish Whiskey', price: 22.50, volume: 1.0, alcoholpercentage: 40},
                {id: 20, name: 'Jillz Red', price: 4.50, volume: 0.7, alcoholpercentage: 5.0},

              ] 
            )
          },
          filterables: null
        }
      },
      filters: {
        type: "none"
      },
      perPage: 20,
      page: 1
    }
  }

  componentDidMount() {
    // Axios.get(
    //   `http://localhost:5000/api/products/?page=${this.state.page}&perpage=${
    //     this.state.perPage
    //   }`
    // )
    //   .then((value: AxiosResponse<ProductResponse>) => {
    //     this.setState({
    //       ...this.state,
    //       type: "loaded",
    //       data: Option(value.data)
    //     })
    //   })
    //   .catch((value: AxiosError) => {
    //     this.setState({
    //       ...this.state,
    //       type: "error",
    //       reason: value.response.status
    //     })
    //   })
  }

  render() {
    switch (this.state.type) {
      case "loaded":
        switch (this.state.data.type) {
          case "none":
            return <>geen producten</>
          case "some":
            return (
              <section className="product-overview">
                {this.state.data.value.products.items.map((value: Product ) => {
                  return(
                  <div className="product-container">
                    <h1 className="product-name">{value.name}</h1>
                    <p className="product-price">€{value.price}</p>
                    <p className="product-volume">{value.volume} liter</p>
                    <p className="product-alcoholpercentage">{value.alcoholpercentage}%</p>
                  </div>
                  )
                })}
              </section>
            )
        }
      case "loading":
        return <>loading</>
      case "error":
      default:
        return <>error</>
    }
  }
}
