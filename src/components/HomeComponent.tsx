import * as React from "react"
import Axios from "axios";
import { ProductComponent } from "./Products/ProductComponent";
import { Product, getAuthorizedAxiosInstance } from "../model";
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
      if(value.data.value.length < 3) return;
      let min: number[] = [0,0,0];
      let mostPopular: any = [0,0,0];
      value.data.value.forEach((element:any) => {
        let minVal = Math.min(...min)
        if(element.amount >= minVal){
          let arr = min.indexOf(minVal);
          min[arr] = element.amount
          mostPopular[arr] = element.product;
        }
      });
      mostPopular.forEach((element:any) => {
        Axios.get(`http://localhost:5000/api/Brand/${element.brandId}`)
        .then((value: any) => {
          element.brandEntity = value.data[0]
        })
      });
      console.log(mostPopular[1]);
      this.setState({
        ...this.state,
        data: mostPopular,
        isLoaded:true
      })
    })
  }
  render() {
    document.title = "Drankreus - Home"
    console.log(this.state.isLoaded);
    return (
      <section className="home">
        <h1 className="content-title">Welkom bij DrankReus!</h1>
        <p>Wij hebben een alcoholisten korting voor onze leden!</p>
        {(this.state.isLoaded) ? <section className='product-overview'>
                {this.state.data.map((value: Product) => {
                  console.log(value.brandEntity)   
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
