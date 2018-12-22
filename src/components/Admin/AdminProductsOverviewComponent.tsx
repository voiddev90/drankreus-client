import * as React from 'react'
import { MainAdminMenuComponent } from './Menu/MainAdminMenuComponent'
import {
  WithGetState,
  ProductResponse,
  getAuthorizedAxiosInstance,
  Option,
  Product
} from '../../model'
import { AdminProductSubMenuComponent } from './Menu/AdminProductSubMenuComponent'
import { AxiosResponse, AxiosError } from 'axios'
import { PaginationComponent } from '../PaginationComponent'
import AdminProductComponent from './AdminProductComponent'

type Props = {}
type State = WithGetState<ProductResponse> & {
  perPage: number
  page: number
}

export default class AdminProductsOverviewComponent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'loading',
      perPage: 40,
      page: 0
    }

    this.renderState = this.renderState.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    getAuthorizedAxiosInstance()
      .get(`product/?index=${this.state.page}&size=${this.state.perPage}`)
      .then((response: AxiosResponse<ProductResponse>) => {
        this.setState({
          ...this.state,
          type: 'loaded',
          data: Option(response.data)
        })
      })
      .catch((error: AxiosError) => {
        this.setState({
          ...this.state,
          type: 'error'
        })
      })
  }

  renderState() {
    switch (this.state.type) {
      case 'loading':
        return <>Loading</>
      default:
      case 'error':
        return <>Fout bij het laden van de producten</>
      case 'loaded':
        switch (this.state.data.type) {
          default:
          case 'none':
            return <>Geen producten gevonden</>
          case 'some':
            return (
              <>
                <>
                  {this.state.data.value.items.map((product: Product) => (
                    <AdminProductComponent product={product} />
                  ))}
                </>
                <PaginationComponent
                  totalPages={this.state.data.value.totalPages}
                  route='product'
                  currentPage={this.state.page}
                  onClick={(page: number) => {
                    this.setState({ ...this.state, page: page }, this.getData)
                  }}
                />
              </>
            )
        }
    }
  }

  render() {
    return (
      <section className='admin products'>
        <MainAdminMenuComponent />
        <AdminProductSubMenuComponent />
        <article className='content'>
          <h1 className='h1 page-title'>Producten</h1>
          {this.renderState()}
        </article>
      </section>
    )
  }
}
