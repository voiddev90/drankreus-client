import * as React from 'react'
import {Pie} from 'react-chartjs-2'
import Axios, { AxiosError, AxiosResponse } from 'axios';
import Select from 'react-select';
import { valueContainerCSS } from 'react-select/lib/components/containers';
import { handleFieldChange } from '../helpers';
import { getAuthorizedAxiosInstance, Product } from '../model';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

type Props = {}
type State = {
  data: [],
  isLoaded: boolean,
  graph: any,
  month: any,
  year: any,
  lowStockProducts: Product[],
  tab: number
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

export default class SaleGraphComponent extends React.Component<Props,State>{
    constructor(props: Props){
        super(props)
        this.state= {
          data: null,
          isLoaded: false,
          graph: null,
          month: 12,
          year: 2018,
          lowStockProducts: [],
          tab: 0
        }
    }
    componentDidMount(){
      this.getData();
      this.getStockTable();
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
    handleChangeNoCallback = (checked: any) => (event: any) => {
      this.setState({...this.state, [checked]:event.target.value})
    }
    getStockTable(){
      getAuthorizedAxiosInstance().get(`stats/productstock`)
      .then((value: AxiosResponse<any>)=>{
        this.setState({...this.state, lowStockProducts: value.data})
      })
    }
    changeTab = (event:any, tab:any) => {
    this.setState({ tab });
  };
    render(){
        return(
          
            <div>
              <Tabs
            value={this.state.tab}
            onChange={this.changeTab}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Populaire producten" />
            <Tab label="Vooraad" />
          </Tabs>
      
              <h4>Populairste producten</h4>
            {this.state.tab ==0 && 
            <div><Select 
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
          :<div>Geen data beschikbaar</div>
          }</div>}
          {this.state.tab == 1 &&<div>
            <h4>Bijna op</h4>
            <Table >
        <TableHead>
          <TableRow>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">price </TableCell>
            <TableCell align="right">inventory </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.lowStockProducts.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.inventory}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
          </div>}
            
        </div>)
    }
}