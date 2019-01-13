import * as React from 'react'
import {
    Product,
    getAuthorizedAxiosInstance,
    Brand,
    Country,
    WithPostState2
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

type Props = {}
type State = WithPostState2<Product>

export default class AdminProductAddComponent extends React.Component<
    Props,
    State
    > {
    constructor(props: Props) {
        super(props)

        this.state = {
            type: 'editing',
            data: {
                id: 0,
                name: '',
                description: '',
                price: null,
                volume: 'cl',
                alcoholpercentage: null,
                url: '',
                brandEntity: null,
                categoryEntity: null,
                countryEntity: null,
                brandId: null,
                categoryId: null,
                countryId: null,
                inventory: 1000
            }
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.renderState = this.renderState.bind(this)
        this.requiredFieldsAreFilled = this.requiredFieldsAreFilled.bind(this)
        this.onsubmit = this.onsubmit.bind(this)
    }

    handleFieldChange = (field: keyof Product) => (value: any) => {
        const changedProduct = {
            ...this.state.data,
            [field]: value
        }
        this.setState({
            ...this.state,
            data: changedProduct
        })
    }

    requiredFieldsAreFilled(product: Product) {
        return (
            product.name.length > 0 &&
            product.price != null &&
            product.volume.length > 2 &&
            product.alcoholpercentage != null &&
            product.description.length > 0
        )
    }

    onsubmit(product: Product) {
        if (this.requiredFieldsAreFilled(product)) {
            this.setState({
                ...this.state,
                type: 'creating'
            })
            getAuthorizedAxiosInstance()
                .post(`product`, { ...product, brandId: product.brandEntity && product.brandEntity.id, countryId: product.countryEntity && product.countryEntity.id })
                .then(_ =>
                    this.setState({
                        ...this.state,
                        type: 'success'
                    })
                )
                .catch(_ =>
                    this.setState({
                        ...this.state,
                        type: 'error',
                        error: 'Er is iets foutgegaan bij het opslaan.'
                    })
                )
        } else {
            this.setState({
                ...this.state,
                type: 'error',
                error: 'De vereiste velden zijn niet ingevuld.'
            })
        }
    }

    renderState() {
        const product = this.state.data
        return (
            <React.Fragment>
                <h1 className='h1 page-title'>Wijzig product</h1>
                <div className='product-edit-form-wrapper fields'>
                    <form className='product-edit-form'>
                        <Grid container spacing={24}>
                            {this.state.type == 'creating' && (
                                <Grid item xs={12}>
                                    <p className='message'>Product opslaan...</p>
                                </Grid>
                            )}
                            {this.state.type == 'error' && (
                                <Grid item xs={12}>
                                    <p className='message'>{this.state.error && this.state.error}</p>
                                </Grid>
                            )}
                            {this.state.type == 'success' && (
                                <Grid item xs={12}>
                                    <p className='message'>Product opgeslagen</p>
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
                                    fullWidth
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
                                        fullWidth
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
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='number'
                                    label={`Volume in ${'cl'}`}
                                    value={product.volume.match(/\d/g) && parseInt(product.volume.match(/\d/g).join(''))}
                                    variant='outlined'
                                    required
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        this.handleFieldChange('volume')(
                                            `${event.target.value} ${'cl'}`
                                        )
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='text'
                                    label='Afbeelding URL'
                                    value={product.url}
                                    variant='outlined'
                                    required
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        this.handleFieldChange('url')(
                                            event.target.value
                                        )
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    rows={4}
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
                                    fullWidth
                                    
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AddBrandComponent
                                    endpoint='brand'
                                    getId={(item: Brand) => item.id}
                                    getName={(item: Brand) => item.name}
                                    onChange={(item: Brand) => {
                                        this.handleFieldChange('brandEntity')(item)
                                    }}
                                    placeholder='Selecteer brand'
                                    default={product.brandEntity}
                                    multiple={false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AddCountryComponent
                                    endpoint='country'
                                    getId={(item: Country) => item.id}
                                    getName={(item: Country) => item.name}
                                    onChange={(item: Country) => {
                                        this.handleFieldChange('countryEntity')(item)
                                    }}
                                    placeholder='Selecteer land'
                                    default={product.countryEntity}
                                    multiple={false}
                                />
                            </Grid>
                            <Grid item xs={12} container spacing={24}>
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={!this.requiredFieldsAreFilled(product)}
                                        onClick={() => this.onsubmit(product)}
                                    >
                                        Opslaan
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </React.Fragment>
        )
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
