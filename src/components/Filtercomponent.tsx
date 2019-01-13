import * as React from 'react'
import ReactDOM from 'react-dom';
import { handleFieldChange } from '../helpers'
import { WithGetState, Tag, Option, Country, Brand } from '../model';
import Axios, { AxiosResponse, AxiosError } from 'axios'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider, { Range, Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import { AddCountryComponent, AddBrandComponent } from './Admin/Productpanel/AddCategoryComponent';
//import '!style-loader!css-loader!rc-slider/assets/index.css'; 
//import '!style-loader!css-loader!../../../src/assets/css/rcslider.css';
//import 'src/assets/css/rcslider.css';

type Props = {
    getQueryString: (e: string) => void
}
type State = {
    AlchoholPercentage: number[],
    Price: number[],
    brandname: Brand[],
    countryname: Country[],
    brand: WithGetState<Tag[]>
    country: WithGetState<Tag[]>
    FilterString: string
}
export default class FilterComponent extends React.Component<Props, State> {
    handleFieldChange: <T>(field: string) => (value: T) => void
    constructor(props: Props) {
        super(props)

        this.state = {
            AlchoholPercentage: [0, 100],
            Price: [0, 3370],
            FilterString: '',
            brandname: [],
            countryname: [],
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

    changeData = (data: keyof State) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ ...this.state, [data]: event.target.value }, this.createQueryString);
    }
    createQueryString() {
        let string: string;
        string = "";
        let brand = this.state.brandname;
        let country = this.state.countryname;
        brand.forEach(i => {
            string = string + "Brand=" + i.id + "&"
        });
        country.forEach(i => {
            string = string + "Country=" + i.id + "&"
        });
        string = string + `Price=${this.state.Price[0]}&Price=${this.state.Price[1]}&`;
        string = string + `Percentage=${this.state.AlchoholPercentage[0]}&Percentage=${this.state.AlchoholPercentage[1]}&`;
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
    handleChangeWithoutCallback = (checked: any) => (event: any) => {
        this.setState({ ...this.state, [checked]: event.target.value });
    }
    handleChangeWithoutEvent = (field: keyof State) => (value: any) => {
        this.setState({ ...this.state, [field]: value }, this.createQueryString)
    }
    render() {
        if (this.state.brand.type === "loaded" && this.state.country.type === "loaded") {
            if (this.state.brand.data.type === 'some' && this.state.country.data.type === 'some') {
                return (
                    <div className="product-filters">
                        <div className='product-filters-inner'>
                            <div className='product-filter alcoholpercentage'>
                                <h4>Alcoholpercentage</h4>
                                <div className='slider-wrapper'>
                                    <Range
                                        min={0}
                                        max={100}
                                        defaultValue={[0, 100]}
                                        value={this.state.AlchoholPercentage}
                                        onChange={p => this.setState({ AlchoholPercentage: p })}
                                        onAfterChange={this.createQueryString}
                                        handle={props => {
                                            return (
                                                <Tooltip prefixCls='rc-slider-tooltip' overlay={props.value} visible={true} placement='top' key={props.index}>
                                                    <Handle {...props} />
                                                </Tooltip>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='product-filter price'>
                                <h4>Prijs</h4>
                                <div className='slider-wrapper'>
                                    <Range
                                        min={0}
                                        max={3370}
                                        defaultValue={[0, 3370]}
                                        value={this.state.Price}
                                        onChange={p => this.setState({ Price: p })}
                                        onAfterChange={this.createQueryString}
                                        handle={props => {
                                            return (
                                                <Tooltip prefixCls='rc-slider-tooltip' overlay={props.value} visible={true} placement='top' key={props.index}>
                                                    <Handle {...props} />
                                                </Tooltip>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='product-filter brand'>
                                <h4>Merk</h4>
                                <AddBrandComponent endpoint='brand' getId={brand => brand.id} getName={brand => brand.name} placeholder='Selecteer Merk' default={this.state.brandname} onChange={(brands: Country[]) => this.handleChangeWithoutEvent('countryname')(brands)} multiple={true} />
                            </div>
                            <div className='product-filter country'>
                                <h4>Land van herkomst</h4>
                                <AddCountryComponent endpoint='country' getId={country => country.id} getName={country => country.name} placeholder='Selecteer land' default={this.state.countryname} onChange={(countries: Country[]) => this.handleChangeWithoutEvent('countryname')(countries)} multiple={true} />
                            </div>
                            <div className='product-filter reset'>
                                <button onClick={e => this.setState({
                                    AlchoholPercentage: [0, 100],
                                    Price: [0, 3370],
                                    FilterString: '',
                                    brandname: [],
                                    countryname: [],
                                }, this.createQueryString)
                                } className='btn btn-sm btn-outline-primary'>Reset</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        else {
            return <div>none</div>
        }
    }
}
