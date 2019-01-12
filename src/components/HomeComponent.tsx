import * as React from "react"
import Axios, { AxiosResponse } from "axios";
import { ProductComponent } from "./Products/ProductComponent";
import { Product, getAuthorizedAxiosInstance, ProductResponse, Tag, Brand, Country} from "../model";
import { addToCart, isLoggedIn} from "../helpers";
import { ReactCookieProps, withCookies } from "react-cookie";
type Props = ReactCookieProps 
type State = {
  data: any,
  isLoaded: boolean
}

class HomeComponent extends React.Component<ReactCookieProps, State> {
  onAdd: (products: number[]) => void
  constructor(props: Props) {
    super(props)
    this.state = {
      data: null,
      isLoaded: false
    }
  }
  componentDidMount() {
    let date = new Date(Date.now());
    getAuthorizedAxiosInstance()
    .get(`Stats/popular/?Month=${date.getMonth() + 1}&Year=${date.getFullYear()}`)
    .then((value: any) => {
      if(value.data.value.length < 3) {
          this.getRandomProduct();
        }
      else{
      let min: number[] = [0,0,0];
      let mostPopular: Product[] = [];
      value.data.value.forEach((element:any) => {
        let minVal = Math.min(...min)
        if(element.amount >= minVal){
          let arr = min.indexOf(minVal);
          min[arr] = element.amount
          mostPopular[arr] = element.product;
        }
      });
      mostPopular.forEach(element => {
        Axios.get(`http://localhost:5000/api/Brand/${element.brandId}`)
        .then((value: AxiosResponse<Brand[]>) => {
          let f:Brand = {id: value.data[0].id, name: value.data[0].name}
          element.brandEntity = f
        })
        Axios.get(`http://localhost:5000/api/Country/${element.countryId}`)
        .then((value: AxiosResponse<Country[]>) => {
          let f:Country = {id: value.data[0].id, name: value.data[0].name}
          element.countryEntity = f
        })
      });
      this.setState({
        ...this.state,
        data: mostPopular,
        isLoaded:true
      })
    }})
    
  }
  getRandomProduct(){
      Axios.get(`http://localhost:5000/api/product/?Products=233&Products=334&products=889&ndex=0&size=100`)
      .then((value: AxiosResponse<ProductResponse>) =>{
        this.setState({
          ...this.state,
          data: value.data.items,
          isLoaded:true
        })
      })
  }
  render() {
    document.title = "Drankreus - Home"
    return (
      <section className="home">
        <h1 className="content-title">Welkom bij DrankReus!</h1>
        <p>Wij hebben een alcoholisten korting voor onze leden!</p>
        {(this.state.isLoaded) ? <section className='product-overview'>
                {this.state.data.map((value: Product) => {
                  return (  
                    <ProductComponent
                      product={value}
                      key={value.id}
                      onAdd={addToCart(this.props.cookies)}
                      
                    />
                  )
                })}
                </section> : <div>aan het laden</div>}
        
      </section>
    )
  }
}
export default withCookies((HomeComponent) as any)
