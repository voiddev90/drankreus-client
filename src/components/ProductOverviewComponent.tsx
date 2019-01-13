import * as React from 'react'
import {
  WithGetState,
  Product,
  Option,
  ProductResponse
} from '../model'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { ProductComponent } from './Products/ProductComponent'
import { PaginationComponent } from './PaginationComponent'
import { ReactCookieProps, withCookies } from 'react-cookie'
import { addToCart } from '../helpers'
import FilterComponent from './Filtercomponent';
import { Select } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp, faChevronCircleDown, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
type ProductOverviewProps = ReactCookieProps & {
}
type ProductOverviewState = WithGetState<ProductResponse> & {
  perPage: number
  page: number
  query: string,
  ascending: boolean,
  filtertype: boolean
}

class ProductOverviewComponent extends React.Component<
  ProductOverviewProps,
  ProductOverviewState
  > {

  constructor(props: ProductOverviewProps) {
    super(props)

    this.state = {
      type: 'loading',
      perPage: 20,
      page: 0,
      query: '',
      ascending: true,
      filtertype: false
    }
    this.getData = this.getData.bind(this)
    this.getString = this.getString.bind(this)
  }

  getData() {
    Axios.get(`http://localhost:5000/api/product/?${this.state.query}Ascending=${this.state.ascending}&FilterType=${this.state.filtertype}&index=${this.state.page}&size=${
      this.state.perPage}`
    )
      .then((value: AxiosResponse<ProductResponse>) => {
        this.setState({
          ...this.state,
          type: 'loaded',
          data: Option(value.data)
        })
      })
      .catch((value: AxiosError) => {
        this.setState({
          ...this.state,
          type: 'error',
          reason: value.response.status
        })
      })
  }
  getString(e: string) {
    this.setState({
      query: e
    }, this.getData)
  }
  componentDidMount() {
    this.getData()
  }
  handleChange = (event: any) => {
    this.setState({ ...this.state, perPage: event.target.value }, this.getData)
  }
  toggleSort = () => {
    this.setState({ ...this.state, ascending: !this.state.ascending }, this.getData)
  }
  toggleType = () => {
    this.setState({ ...this.state, filtertype: !this.state.filtertype }, this.getData)
  }
  render() {
    switch (this.state.type) {
      case 'loaded':
        switch (this.state.data.type) {
          case 'none':
            return <>Er zijn geen producten gevonden.</>
          case 'some':
            return (
              <section className='product-overview container-fluid'>
                <div className='product-overview-inner row'>
                  <div className='filter col-3'><FilterComponent getQueryString={this.getString} /></div>
                  <div className='products-wrapper col-9'>
                    <div className="sort-bar row">
                      <div className='per-page-wrapper col'>
                        <p className='per-page'><select name="perPage" className='per-page-select' value={this.state.perPage} onChange={this.handleChange}>
                          <option value={20}>20</option>
                          <option value={40}>40</option>
                          <option value={60}>60</option>
                        </select> per pagina</p>
                      </div>

                      <div className='sort-wrapper col'>
                        <div className='sort sort-item'>
                          {this.state.ascending ? <p onClick={this.toggleSort}>Sorteer <FontAwesomeIcon icon={faChevronUp} /></p> : <p onClick={this.toggleSort}>Sorteer <FontAwesomeIcon icon={faChevronDown} /></p>}
                        </div>
                        <div className='sort-entity sort-item'>
                          {this.state.filtertype ? <p onClick={this.toggleType}><u>Prijs</u> AlcoholPercentage</p> : <p onClick={this.toggleType}>Prijs <u>AlcoholPercentage</u></p>}
                        </div>
                      </div>
                    </div>
                    <PaginationComponent
                      totalPages={this.state.data.value.totalPages}
                      route='product'
                      currentPage={this.state.page}
                      onClick={(page: number) => {
                        this.setState({ ...this.state, page: page }, this.getData)
                      }}
                    />
                    <div className='products row'>
                      {this.state.data.value.items.map((value: Product) => {
                        return (
                          <ProductComponent
                            product={value}
                            key={value.id}
                            onAdd={addToCart(this.props.cookies)}
                          />
                        )
                      })}
                    </div>
                    <PaginationComponent
                      totalPages={this.state.data.value.totalPages}
                      route='product'
                      currentPage={this.state.page}
                      onClick={(page: number) => {
                        this.setState({ ...this.state, page: page }, this.getData)
                      }}
                    />
                  </div>
                </div>
              </section>
            )
        }
      case 'loading':
        return <>loading</>
      case 'error':
      default:
        return <>error</>
    }
  }
}

export default withCookies((ProductOverviewComponent) as any)
