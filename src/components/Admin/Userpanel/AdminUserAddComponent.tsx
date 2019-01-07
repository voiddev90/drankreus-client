import * as React from 'react'
import {
    getAuthorizedAxiosInstance,
    WithPostState2,
    User
} from '../../../model'
import { MainAdminMenuComponent } from '../Menu/MainAdminMenuComponent'
import { TextField, Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { AdminUserSubMenuComponent } from '../Menu/AdminUsersSubMenuComponent';

type Props = {}
type State = WithPostState2<User> & {
    confirmPassword: string
}

export default class AdminUserAddComponent extends React.Component<
    Props,
    State
    > {
    constructor(props: Props) {
        super(props)

        this.state = {
            type: 'editing',
            data: {
                id: 0,
                email: '',
                password: '',
                firstName: '',
                prefix: '',
                lastName: '',
                street: '',
                buildingNumber: null,
                postalCode: '',
                area: '',
                admin: false
            },
            confirmPassword: ''
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.renderState = this.renderState.bind(this)
        this.requiredFieldsAreFilled = this.requiredFieldsAreFilled.bind(this)
        this.onsubmit = this.onsubmit.bind(this)
        this.checkPasswords = this.checkPasswords.bind(this)
    }

    handleFieldChange = (field: keyof User) => (value: any) => {
        const changedProduct = {
            ...this.state.data,
            [field]: value
        }
        this.setState({
            ...this.state,
            data: changedProduct
        })
    }

    requiredFieldsAreFilled(user: User) {
        return (
            user.email.length > 0 &&
            user.password.length > 0 &&
            this.state.confirmPassword.length > 0 &&
            user.firstName.length > 0 &&
            user.lastName.length > 0
        )
    }

    checkPasswords(user: User) {
        return user.password == this.state.confirmPassword
    }

    onsubmit(user: User) {
        if (this.requiredFieldsAreFilled(user)) {
            if (this.checkPasswords(user)) {
                this.setState({
                    ...this.state,
                    type: 'creating'
                })
                getAuthorizedAxiosInstance()
                    .post(`users`, user)
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
                    error: 'Wachtwoorden komen niet overeen.'
                })
            }
        } else {
            this.setState({
                ...this.state,
                type: 'error',
                error: 'De vereiste velden zijn niet ingevuld.'
            })
        }
    }

    renderState() {
        const user = this.state.data
        return (
            <React.Fragment>
                <h1 className='h1 page-title'>Wijzig Gebruiker</h1>
                <div className='product-edit-form-wrapper fields'>
                    <form className='product-edit-form'>
                        <div className='user-data-edit'>
                            <Grid container spacing={24}>
                                {this.state.type == 'creating' && (
                                    <Grid item xs={12}>
                                        <p className='message'>Gebruiker opslaan...</p>
                                    </Grid>
                                )}
                                {this.state.type == 'error' && (
                                    <Grid item xs={12}>
                                        <p className='message'>{this.state.error && this.state.error}</p>
                                    </Grid>
                                )}
                                {this.state.type == 'success' && (
                                    <Grid item xs={12}>
                                        <p className='message'>Gebruiker opgeslagen</p>
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
                                    <TextField
                                        type='password'
                                        label='Wachtwoord'
                                        value={user.password}
                                        variant='outlined'
                                        required
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            this.handleFieldChange('password')(
                                                event.target.value
                                            )
                                        }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type='password'
                                        label='Wachtwoord bevestigen'
                                        value={this.state.confirmPassword}
                                        variant='outlined'
                                        required
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({ ...this.state, confirmPassword: event.target.value })}
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
                                            disabled={!(this.requiredFieldsAreFilled(user))}
                                            onClick={() => this.onsubmit(user)}
                                        >
                                            Opslaan
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
