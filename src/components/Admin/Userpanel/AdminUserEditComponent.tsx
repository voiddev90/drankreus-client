import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router'
import {
  Product,
  WithPutState,
  Option,
  getAuthorizedAxiosInstance,
  WithDeleteState,
  User
} from '../../../model'
import { AxiosResponse, AxiosError } from 'axios'
import { MainAdminMenuComponent } from '../Menu/MainAdminMenuComponent'
import { AdminProductSubMenuComponent } from '../Menu/AdminProductSubMenuComponent'
import { TextField, Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faSpinner,
  faExclamation
} from '@fortawesome/free-solid-svg-icons'
import { AdminUserSubMenuComponent } from '../Menu/AdminUsersSubMenuComponent';

type Props = RouteComponentProps<{ slug: string }>
type State = {
  editing: WithPutState<User>
  deleting: WithDeleteState<User>
  redirect: boolean
}

export default class AdminUserEditComponent extends React.Component<
  Props,
  State
  > {
  private OriginalUser: User
  constructor(props: Props) {
    super(props)

    const newState: WithPutState<User> | WithDeleteState<User> = {
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
    this.requiredFieldsAreFilled = this.requiredFieldsAreFilled.bind(this)
    this.onsubmit = this.onsubmit.bind(this)
  }

  deleteProduct(userId: number) {
    this.setState({
      ...this.state,
      deleting: {
        type: 'removing'
      }
    })
    getAuthorizedAxiosInstance()
      .delete(`users/${userId}`)
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
      .get(`users/${this.props.match.params.slug}`)
      .then((response: AxiosResponse<User>) => {
        console.log('got: ', response)
        const newState: WithPutState<User> | WithDeleteState<User> = {
          type: 'editing',
          data: Option(response.data)
        }
        if (newState.data.type == 'some') {
          this.OriginalUser = newState.data.value
        }
        this.setState({
          ...this.state,
          deleting: newState,
          editing: newState
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

  handleFieldChange = (field: keyof User) => (value: any) => {
    if (
      this.state.editing.type == 'editing' &&
      this.state.editing.data.type == 'some'
    ) {
      const changedUser = {
        ...this.state.editing.data.value,
        [field]: value
      }
      this.setState({
        ...this.state,
        editing: {
          type: 'editing',
          data: Option(changedUser)
        }
      })
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps: Props) {
    this.props.match.params.slug != prevProps.match.params.slug &&
      this.getData()
  }

  requiredFieldsAreFilled(user: User) {
    return (
      user.email.length > 0 &&
      user.firstName.length > 0 &&
      user.lastName.length > 0
    )
  }

  productIsChanged(user: User) {
    const userValues = Object.getOwnPropertyNames(user)
    return userValues.filter((value: keyof User) => user[value] == this.OriginalUser[value]).length != userValues.length
  }

  onsubmit(user: User) {
    console.log('sending: ', user)
    if (this.requiredFieldsAreFilled(user) && this.productIsChanged(user)) {
      this.setState({
        ...this.state,
        editing: {
          type: 'updating',
          data: Option(user)
        }
      })
      getAuthorizedAxiosInstance()
        .put(`users/${user.id}`, user)
        .then(_ =>
          this.setState({
            ...this.state,
            editing: {
              type: 'success',
              data: Option(user)
            }
          })
        )
        .catch(_ =>
          this.setState({
            ...this.state,
            editing: {
              type: 'error',
              data: Option(user)
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
        if (!this.state.editing.data) {
          return <>Fout bij het ophalen van het product.</>
        }
      case 'updating':
      case 'loaded':
        switch (this.state.editing.data.type) {
          default:
          case 'none':
            return <>Geen producten gevonden</>
          case 'some':
            const user = this.state.editing.data.value
            return (
              <React.Fragment>
                <h1 className='h1 page-title'>Wijzig Gebruiker</h1>
                <div className='product-edit-form-wrapper fields'>
                  <form className='product-edit-form'>
                    <div className='user-data-edit'>
                      <Grid container spacing={24}>
                        {this.state.editing.type == 'updating' && (
                          <Grid item xs={12}>
                            <p className='message'>Aanpassingen opslaan...</p>
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <TextField
                            type='text'
                            label='Voornaam'
                            value={user.firstName}
                            variant='outlined'
                            required
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('firstName')(event.target.value)
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='text'
                            label='Tussenvoegsel'
                            value={user.prefix}
                            variant='outlined'
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('prefix')(
                                event.target.value
                              )
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='text'
                            label='Achternaam'
                            value={user.lastName}
                            variant='outlined'
                            required
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('lastName')(
                                event.target.value
                              )
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='text'
                            label='E-mail'
                            value={user.email}
                            variant='outlined'
                            required
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('email')(
                                event.target.value
                              )
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={user.admin}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleFieldChange('admin')(event.target.checked)}
                                value="admin"
                                color="primary"
                              />
                            }
                            label="Gebruiker heeft admin privileges"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='text'
                            label='Straatnaam'
                            value={user.street}
                            variant='outlined'
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('street')(
                                event.target.value
                              )
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='number'
                            label='Huisnummer'
                            value={user.buildingNumber}
                            variant='outlined'
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('buildingNumber')(
                                event.target.value
                              )
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='text'
                            label='Postcode'
                            value={user.postalCode}
                            variant='outlined'
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('postalCode')(
                                event.target.value
                              )
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            multiline
                            type='number'
                            label='Woonplaats'
                            value={user.area}
                            variant='outlined'
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              this.handleFieldChange('area')(
                                event.target.value
                              )
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} container spacing={24}>
                          <Grid item>
                            <Button
                              variant='contained'
                              color='primary'
                              disabled={!(this.productIsChanged(user) && this.requiredFieldsAreFilled(user))}
                              onClick={() => this.onsubmit(user)}
                            >
                              Opslaan
                          </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant='text'
                              color='secondary'
                              onClick={_ => this.deleteProduct(user.id)}
                            >
                              {this.state.deleting.type == 'removing' ? (
                                <FontAwesomeIcon icon={faSpinner} spin />
                              ) : (this.state.deleting.type == 'loaded' ||
                                this.state.deleting.type == 'editing') ? (
                                    <FontAwesomeIcon icon={faTrash} />
                                  ) : (
                                    <FontAwesomeIcon icon={faExclamation} />
                                  )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
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
            <AdminUserSubMenuComponent />
          </Grid>
          <Grid item xs={8}>
            <article className='content'>{this.renderState()}</article>
          </Grid>
        </Grid>
      </section>
    )
  }
}
