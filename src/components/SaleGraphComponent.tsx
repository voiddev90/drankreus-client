import * as React from 'react'
import {Pie} from 'react-chartjs-2'
import Axios, { AxiosError } from 'axios';
import Select from 'react-select';
import { valueContainerCSS } from 'react-select/lib/components/containers';
import { handleFieldChange } from '../helpers';
import { getAuthorizedAxiosInstance } from '../model';

type Props = {}
type State = {
  data: [],
  isLoaded: boolean,
  graph: any,
  month: any,
  year: any
}
const options = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const year = []

export default class SaleGraphComponent extends React.Component<Props,State>{
    constructor(props: Props){
        super(props)
        this.state= {
          data: null,
          isLoaded: false,
          graph: null,
          month: 12,
          year: 2018
        }
    }
    componentDidMount(){
      this.getData();
    }
    getData(){
    getAuthorizedAxiosInstance()
       .get(`Stats/products/?Month=${this.state.month}&Year=${this.state.year}`)
            .then((value: any) => {
                this.setState({
                    ...this.state,
                    data: value.data,
                },()=> this.CreateGraphData())
            })
    }
    CreateGraphData(){
      console.log(this.state.data);
      if (this.state.data.length <= 0){
        this.setState({...this.state,isLoaded:false})      
        return;
      }

      let labels: string[] = [];
      let amount: string[] = [];
      let colors: string[] = [];
      for (let index = 0; index < this.state.data.length; index++) {
        let element:any = this.state.data[index];
        labels.push(element.product.name);
        amount.push(element.amount);
        colors.push(this.getRandomColor());
        
      }
      const data = {
      labels: labels
      ,
      datasets: [{
        data: amount,
        backgroundColor: colors
        ,
        hoverBackgroundColor: colors
      }]
     
    }; 
      this.setState({...this.state, graph:data, isLoaded:true});
    }
    getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }
    handleChange = (checked: any) => (event: any) => {
      this.setState({...this.state, [checked]:event.value},this.getData)
    }
    render(){
        return <div>
            <Select 
            value={this.state.month.label}
            onChange={this.handleChange('month')}
            options={options}
            />
            <Select 
            value={this.state.year.value}
            onChange={this.handleChange('year')}
            options={[{ value: 2018, label: 2018}, {value:2019, label:2019}]}
            />
          {this.state.isLoaded ? 
          <div>
            <Pie data={this.state.graph}/> 
            </div>
          :<div>Geen data beschikbaar</div>}
            
        </div>
    }
}