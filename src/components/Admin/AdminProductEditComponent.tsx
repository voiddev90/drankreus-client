import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import {
  Product,
  WithPutState,
  Option,
  getAuthorizedAxiosInstance,
  ProductResponse
} from '../../model'
import { AxiosResponse, AxiosError } from 'axios'
import { MainAdminMenuComponent } from './Menu/MainAdminMenuComponent'
import { AdminProductSubMenuComponent } from './Menu/AdminProductSubMenuComponent'
import { TextField, Grid, Button } from '@material-ui/core'

type Props = RouteComponentProps<{ slug: string }>
type State = WithPutState<Product>

export default class AdminProductEditComponent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)

    const product: Option<Product> = Option(this.props.location.state)

    this.state =
      product.type == 'some'
        ? {
            type: 'loaded',
            data: product
          }
        : {
            type: 'loading'
          }

    this.getData = this.getData.bind(this)
  }

  getData() {
    getAuthorizedAxiosInstance()
      .get(`products/${this.props.match.params.slug}`)
      .then((response: AxiosResponse<ProductResponse>) => {
        this.setState({
          type: 'loaded',
          data: Option(response.data)
        })
      })
      .catch((response: AxiosError) => {
        this.setState({
          type: 'error'
        })
      })
  }

  componentDidMount() {
    !this.props.location.state && this.getData()
  }

  componentDidUpdate(prevProps: Props) {
    this.props.match.params.slug != prevProps.match.params.slug &&
      !this.props.location.state &&
      this.getData()
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
              <React.Fragment>
                <h1 className='h1 page-title'>Wijzig product</h1>
                <div className='product-edit-form-wrapper fields'>
                  <form className='product-edit-form'>
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <TextField
                          type='text'
                          label='Naam'
                          value={this.state.data.value.name}
                          variant='outlined'
                          required
                        />
                      </Grid>
                      <Grid item xs={12} container spacing={24}>
                        <Grid item>
                          <TextField
                            type='number'
                            label='Prijs'
                            value={this.state.data.value.price}
                            variant='outlined'
                            required
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            type='number'
                            label='Volume'
                            value={this.state.data.value.volume}
                            variant='outlined'
                            required
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            type='number'
                            label='Alcoholpercentage'
                            value={this.state.data.value.alcoholpercentage}
                            variant='outlined'
                            required
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          multiline
                          type='text'
                          label='Omschrijving'
                          value={this.state.data.value.description}
                          variant='outlined'
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant='contained' color='primary'>
                          Opslaan
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </React.Fragment>
            )
        }
    }
  }

  render() {
    return (
      <section className='admin product-edit'>
        <Grid container>
          <Grid item xs={2}>
            <MainAdminMenuComponent />
          </Grid>
          <Grid item xs={2}>
            <AdminProductSubMenuComponent />
          </Grid>
          <Grid item xs={8}>
            <article className='content'>{this.renderState()}</article>
          </Grid>
        </Grid>
      </section>
    )
  }
}
