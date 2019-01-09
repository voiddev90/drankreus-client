import * as React from 'react'
import ReactDOM from 'react-dom';
import { handleFieldChange } from '../helpers'
import { WithGetState, Tag, Option } from '../model';
import Axios, { AxiosResponse, AxiosError } from 'axios'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider, {Range} from 'rc-slider';
import '!style-loader!css-loader!rc-slider/assets/index.css'; 
type Props = {
    getQueryString: (e: string) => void
}
type State = {
    AlchoholPercentage: number[],
    Price: number[],
    brandname: string[],
    countryname: string[],
    brand: WithGetState<Tag[]>
    country: WithGetState<Tag[]>
    ascending: boolean
    FilterString: string
}
export default class FilterComponent extends React.Component<Props, State> {
    handleFieldChange: <T>(field: string) => (value: T) => void
    constructor(props: Props) {
        super(props)

        this.state = {
            AlchoholPercentage: [0,100],
            Price: [0,3370],
            FilterString: '',
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
        string = string + `Price=${this.state.Price[0]}&Price=${this.state.Price[1]}&`;
        string = string + `Percentage=${this.state.AlchoholPercentage[0]}&Percentage=${this.state.AlchoholPercentage[1]}&`;
        string = string + `Ascending=${this.state.ascending}&`;
        console.log(string);
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
    render() {
        if (this.state.brand.type === "loaded" && this.state.country.type === "loaded") {
            if (this.state.brand.data.type === 'some' && this.state.country.data.type === 'some') {
                return (
                    <section className="product-filter">
                        <div>
                            <h1>Alcoholpercentage (%)</h1>
                            {this.state.AlchoholPercentage[0]} Min
                            <Range
                             min={0}
                             max={100}
                             defaultValue={[0,100]}
                             value={this.state.AlchoholPercentage}
                             onChange={p => this.setState({AlchoholPercentage: p})}
                             onAfterChange={this.createQueryString}
                            />
                            {this.state.AlchoholPercentage[1]} Max
                           <h1>Prijs (€)</h1>
                            {this.state.Price[0]} Min
                            <Range
                             min={0}
                             max={3370}
                             defaultValue={[0,3370]}
                             value={this.state.Price}
                             onChange={p => this.setState({Price: p})}
                             onAfterChange={this.createQueryString}
                            />
                            {this.state.Price[1]} Max
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
                            <button onClick={e => this.setState({
                                AlchoholPercentage: [0,100],
                                Price: [0,3370],
                                FilterString: '',
                                brandname: [],
                                countryname: [],
                                ascending: false
                            }, this.createQueryString)
                            }>Reset</button>
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
