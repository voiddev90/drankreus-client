import * as React from 'react'
import { handleFieldChange } from '../helpers'
import { WithGetState, Tag, Option } from '../model';
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type Props = {
    getQueryString: (e: string) => void
}
type State = {
    brandname: string[],
    countryname: string[],
    brand: WithGetState<Tag[]>
    country: WithGetState<Tag[]>
    ascending: boolean
    FilterString: string
    AlcoholMax: number
    AlcoholMin: number
    PriceMin: number
    PriceMax: number
}

export default class FilterComponent extends React.Component<Props, State> {
    handleFieldChange: <T>(field: string) => (value: T) => void
    constructor(props: Props) {
        super(props)

        this.state = {
            FilterString: '',
            AlcoholMax: 100,
            AlcoholMin: 0,
            PriceMin: 0,
            PriceMax: 9999,
            brandname: [],
            countryname: [],
            ascending: false,
            brand: {
                type: 'loading'
            },
            country: {
                type: 'loading'
            }
        }

        this.createQueryString = this.createQueryString.bind(this);
        this.handleFieldChange = handleFieldChange.bind(this)
    }

    changeData = (data: any) => (event: any) => {
        this.setState({ ...this.state, [data]: event.target.value }, this.createQueryString);
    }
    createQueryString() {
        let string: string;
        string = "";
        let brand = this.state.brandname;
        let country = this.state.countryname;
        brand.forEach(i => {
            let temp = JSON.parse(i)
            string = string + "Brand=" + temp.id + "&"
        });
        country.forEach(i => {
            let temp = JSON.parse(i)
            string = string + "Country=" + temp.id + "&"
        });
        string = string + `Price=${this.state.PriceMin}&Price=${this.state.PriceMax}&`
        string = string + `Percentage=${this.state.AlcoholMin}&Percentage=${this.state.AlcoholMax}&`
        string = string + `Ascending=${this.state.ascending}&`
        this.props.getQueryString(string);
    }
    componentDidMount() {
        Axios.get('http://localhost:5000/api/Brand')
            .then((value: AxiosResponse<Tag[]>) => {
                this.setState({
                    ...this.state,
                    brand: {
                        type: 'loaded',
                        data: Option(value.data)
                    }
                })
            }).catch((value: AxiosError) => {
                this.setState({
                    ...this.state,
                    brand: {
                        type: 'error',
                        reason: value.response.status
                    }
                })
            })
        Axios.get('http://localhost:5000/api/Country')
            .then((value: AxiosResponse<Tag[]>) => {
                this.setState({
                    ...this.state,
                    country: {
                        type: 'loaded',
                        data: Option(value.data)
                    }
                })
            }).catch((value: AxiosError) => {
                this.setState({
                    ...this.state,
                    country: {
                        type: 'error',
                        reason: value.response.status
                    }
                })
            })
    }
    handleChange = (checked: any) => (event: any) => {
        this.setState({ ...this.state, [checked]: event.target.checked }, this.createQueryString);
    }
    render() {
        if (this.state.brand.type === "loaded" && this.state.country.type === "loaded") {
            if (this.state.brand.data.type === 'some' && this.state.country.data.type === 'some') {
                return (
                    <section className="product-filter">
                        <div>
                            <h1>Alcoholpercentage (%)</h1>
                            <input
                                type='number'
                                name='alcoholfiltermin'
                                value={this.state.AlcoholMin}
                                onChange={this.changeData('AlcoholMin')}
                                 /> min
                            <input
                                type='number'
                                name='alcoholfiltermax'
                                value={this.state.AlcoholMax}
                                onChange={this.changeData('AlcoholMax')}
                                 /> max
                           <h1>Prijs (€)</h1>
                            <input
                                type='number'
                                name='prijsfiltermin'
                                value={this.state.PriceMin}
                                onChange={this.changeData('PriceMin')}
                            />
                                min
                            <input
                                type='number'
                                name='prijsfiltermax'
                                value={this.state.PriceMax}
                                onChange={this.changeData('PriceMax')}
                            />
                                max
                        </div>
                        <section>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.ascending}
                                        onChange={this.handleChange('ascending')}
                                        value="checkedA"
                                        color="secondary"
                                    />}
                                label={(this.state.ascending) ? "Laag naar Hoog" : "Hoog naar Laag" } />
                        </section>
                        <section className="brand-filter">
                            <FormControl className="brand-multi-select-form">
                                <InputLabel htmlFor="select-multiple-brand">Merk</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.brandname}
                                    onChange={this.changeData('brandname')}
                                    input={<Input id="select-multiple-brand" />}
                                    renderValue={(selected: any) => (
                                        <div className="selected-brands">
                                            {selected.map((value: any) => (
                                                <Chip key={JSON.parse(value).id} label={JSON.parse(value).name} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {this.state.brand.data.value.map(tag => (
                                        <MenuItem key={tag.id} value={JSON.stringify(tag)}>
                                            {tag.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </section>
                        <section className="country-filter">
                            <FormControl className="country-multi-select-form">
                                <InputLabel htmlFor="select-multiple-country">Land</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.countryname}
                                    onChange={this.changeData('countryname')}
                                    input={<Input id="select-multiple-country" />}
                                    renderValue={(selected: any) => (
                                        <div className="selected-countries">
                                            {selected.map((value: any) => (
                                                <Chip key={JSON.parse(value).id} label={JSON.parse(value).name} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {this.state.country.data.value.map(tag => (
                                        <MenuItem key={tag.id} value={JSON.stringify(tag)}>
                                            {tag.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </section>

                    </section>

                )
            }
        }
        else {
            return <div>none</div>
        }
    }
}
