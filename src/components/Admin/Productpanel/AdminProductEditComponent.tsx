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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.renderState = this.renderState.bind(this)
    this.checkRequiredFields = this.checkRequiredFields.bind(this)
    this.onsubmit = this.onsubmit.bind(this)
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

  handleFieldChange = (field: keyof Product) => (value: string) => {
    if (this.state.type == 'loaded' && this.state.data.type == 'some') {
      const changedProduct = { ...this.state.data.value, [field]: value }
      this.setState({
        ...this.state,
        data: Option(changedProduct)
      })
    }
  }

  componentDidMount() {
    !this.props.location.state && this.getData()
  }

  componentDidUpdate(prevProps: Props) {
    this.props.match.params.slug != prevProps.match.params.slug &&
      !this.props.location.state &&
      this.getData()
  }

  checkRequiredFields() {
    if (this.state.type == 'loaded' && this.state.data.type == 'some') {
      const product = this.state.data.value
      return (
        product.name != '' &&
        product.price != null &&
        product.volume != null &&
        product.alcoholpercentage != '' &&
        product.brandId != null &&
        product.countryId != null &&
        product.description != ''
      )
    } else {
      return false
    }
  }

  onsubmit(product: Product) {
    console.log(this.checkRequiredFields())
    if (this.checkRequiredFields()) {
      this.setState({
        ...this.state,
        type: 'updating',
        data: Option(product)
      })
      getAuthorizedAxiosInstance()
        .put(`product/${product.id}`, product)
        .then(_ =>
          this.setState({
            ...this.state,
            type: 'success',
            data: Option(product)
          })
        )
        .catch(_ =>
          this.setState({
            ...this.state,
            type: 'error',
            data: Option(product)
          })
        )
    }
  }

  renderState() {
    switch (this.state.type) {
      case 'loading':
        return <>Loading</>
      default:
      case 'error':
      case 'updating':
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
                      {this.state.type == 'updating' && (
                        <Grid item xs={12}>
                          <p className='message'>Aanpassingen opslaan...</p>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <TextField
                          type='text'
                          label='Naam'
                          value={this.state.data.value.name}
                          variant='outlined'
                          required
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) =>
                            this.handleFieldChange('name')(event.target.value)
                          }
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
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('price')(
                                event.target.value
                              )
                            }
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            type='number'
                            label='Alcoholpercentage'
                            value={this.state.data.value.alcoholpercentage}
                            variant='outlined'
                            required
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('alcoholpercentage')(
                                event.target.value
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type='number'
                          label={`Volume in ${'cl'}`}
                          value={parseInt(
                            this.state.data.value.volume.match(/\d/g).join('')
                          )}
                          variant='outlined'
                          required
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) =>
                            this.handleFieldChange('volume')(
                              `${event.target.value} ${'cl'}`
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          multiline
                          type='text'
                          label='Omschrijving'
                          value={this.state.data.value.description}
                          variant='outlined'
                          required
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) =>
                            this.handleFieldChange('description')(
                              event.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} container spacing={24}>
                        <Grid item>
                          <Button
                            variant='contained'
                            color='primary'
                            disabled={this.checkRequiredFields()}
                            onClick={() => {
                              ;(this.state.type == 'loaded' ||
                                this.state.type == 'updating' ||
                                this.state.type == 'success') &&
                                this.state.data.type == 'some' &&
                                this.onsubmit(this.state.data.value)
                            }}
                          >
                            Opslaan
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant='text' color='secondary'>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Grid>
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
