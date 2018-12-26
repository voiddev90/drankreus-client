import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router'
import {
  Product,
  WithPutState,
  Option,
  getAuthorizedAxiosInstance,
  ProductResponse,
  Brand,
  WithDeleteState,
  Country
} from '../../../model'
import { AxiosResponse, AxiosError } from 'axios'
import { MainAdminMenuComponent } from '../Menu/MainAdminMenuComponent'
import { AdminProductSubMenuComponent } from '../Menu/AdminProductSubMenuComponent'
import { TextField, Grid, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faSpinner,
  faExclamation
} from '@fortawesome/free-solid-svg-icons'
import { AddBrandComponent, AddCountryComponent } from './AddCategoryComponent'

type Props = RouteComponentProps<{ slug: string }>
type State = {
  editing: WithPutState<Product>
  deleting: WithDeleteState<Product>
  redirect: boolean
}

export default class AdminProductEditComponent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)

    const product: Option<Product> = Option(this.props.location.state)

    const newState: WithPutState<Product> | WithDeleteState<Product> =
      product.type == 'some'
        ? {
            type: 'loaded',
            data: product
          }
        : {
            type: 'loading'
          }

    this.state = {
      editing: newState,
      deleting: newState,
      redirect: false
    }

    this.getData = this.getData.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.renderState = this.renderState.bind(this)
    this.checkRequiredFields = this.checkRequiredFields.bind(this)
    this.onsubmit = this.onsubmit.bind(this)
  }

  deleteProduct(productId: number) {
    this.setState({
      ...this.state,
      deleting: {
        type: 'removing'
      }
    })
    getAuthorizedAxiosInstance()
      .delete(`product/${productId}`)
      .then(_ => {
        this.setState({
          ...this.state,
          editing: {
            type: 'loading'
          },
          deleting: {
            type: 'success'
          }
        })
      })
      .catch(_ => {
        this.setState({
          ...this.state,
          deleting: {
            type: 'error'
          }
        })
      })
  }

  getData() {
    getAuthorizedAxiosInstance()
      .get(`products/${this.props.match.params.slug}`)
      .then((response: AxiosResponse<Product>) => {
        const newState: WithPutState<Product> | WithDeleteState<Product> = {
          type: 'loaded',
          data: Option(response.data)
        }
        this.setState({
          editing: newState,
          deleting: newState
        })
      })
      .catch((response: AxiosError) => {
        this.setState({
          ...this.state,
          editing: {
            type: 'error'
          }
        })
      })
  }

  handleFieldChange = (field: keyof Product) => (value: any) => {
    if (
      this.state.editing.type == 'loaded' &&
      this.state.editing.data.type == 'some'
    ) {
      const changedProduct = {
        ...this.state.editing.data.value,
        [field]: value
      }
      this.setState({
        ...this.state,
        editing: {
          type: 'editing',
          data: Option(changedProduct)
        }
      })
    }
  }

  componentDidMount() {
    !this.props.location.state && this.getData()
  }

  componentWillUpdate(prevProps: Props) {
    if (prevProps.match.params.slug != this.props.match.params.slug)
      this.getData()
  }

  componentDidUpdate(prevProps: Props) {
    this.props.match.params.slug != prevProps.match.params.slug &&
      !this.props.location.state &&
      this.getData()
  }

  checkRequiredFields(product: Product) {
    return (
      product.name != '' &&
      product.price != null &&
      product.volume != null &&
      product.alcoholpercentage != '' &&
      product.brandEntity != null &&
      product.countryEntity != null &&
      product.description != ''
    )
  }

  onsubmit(product: Product) {
    if (this.checkRequiredFields(product)) {
      this.setState({
        ...this.state,
        editing: {
          type: 'updating',
          data: Option(product)
        }
      })
      getAuthorizedAxiosInstance()
        .put(`product/${product.id}`, product)
        .then(_ =>
          this.setState({
            ...this.state,
            editing: {
              type: 'success',
              data: Option(product)
            }
          })
        )
        .catch(_ =>
          this.setState({
            ...this.state,
            editing: {
              type: 'error',
              data: Option(product)
            }
          })
        )
    }
  }

  renderState() {
    switch (this.state.editing.type) {
      case 'loading':
        if (this.state.deleting.type == 'success') {
          if (this.state.redirect) {
            return <Redirect to='/admin/products' />
          } else {
            window.setTimeout(
              () => this.setState({ ...this.state, redirect: true }),
              1000
            )
            return <>Product succesvol verwijderd.</>
          }
        } else {
          return <>Loading</>
        }
      default:
      case 'error':
      case 'updating':
      case 'loaded':
        switch (this.state.editing.data.type) {
          default:
          case 'none':
            return <>Geen producten gevonden</>
          case 'some':
            const product = this.state.editing.data.value
            return (
              <React.Fragment>
                <h1 className='h1 page-title'>Wijzig product</h1>
                <div className='product-edit-form-wrapper fields'>
                  <form className='product-edit-form'>
                    <Grid container spacing={24}>
                      {this.state.editing.type == 'updating' && (
                        <Grid item xs={12}>
                          <p className='message'>Aanpassingen opslaan...</p>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <TextField
                          type='text'
                          label='Naam'
                          value={product.name}
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
                            value={product.price}
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
                            value={product.alcoholpercentage}
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
                          value={parseInt(product.volume.match(/\d/g).join(''))}
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
                          value={product.description}
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
                      <Grid item xs={12}>
                        <AddBrandComponent
                          endpoint='brand'
                          getId={(item: Brand) => item.id}
                          getName={(item: Brand) => item.name}
                          onChange={(item: Brand) =>
                            this.handleFieldChange('brandEntity')(item)
                          }
                          placeholder='Selecteer brand'
                          default={product.brandEntity}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <AddCountryComponent
                          endpoint='brand'
                          getId={(item: Country) => item.id}
                          getName={(item: Country) => item.name}
                          onChange={(item: Country) =>
                            this.handleFieldChange('countryEntity')(item)
                          }
                          placeholder='Selecteer land'
                          default={product.countryEntity}
                        />
                      </Grid>
                      <Grid item xs={12} container spacing={24}>
                        <Grid item>
                          <Button
                            variant='contained'
                            color='primary'
                            disabled={!this.checkRequiredFields(product)}
                            onClick={() => this.onsubmit(product)}
                          >
                            Opslaan
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant='text'
                            color='secondary'
                            onClick={_ => this.deleteProduct(product.id)}
                          >
                            {this.state.deleting.type == 'removing' ? (
                              <FontAwesomeIcon icon={faSpinner} spin />
                            ) : this.state.deleting.type == 'loaded' ||
                              this.state.deleting.type == 'editing' ? (
                              <FontAwesomeIcon icon={faTrash} />
                            ) : (
                              <FontAwesomeIcon icon={faExclamation} />
                            )}
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
