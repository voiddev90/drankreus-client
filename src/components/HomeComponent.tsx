import * as React from "react"
import Axios from "axios";
import { ProductComponent } from "./Products/ProductComponent";
import { Product, getAuthorizedAxiosInstance } from "../model";
import { addToCart, isLoggedIn} from "../helpers";
import { ReactCookieProps } from "react-cookie";
type Props = ReactCookieProps 
type State = {
  data :any,
  isLoaded :boolean
}

export default class HomeComponent extends React.Component<ReactCookieProps, State> {
  onAdd: (products: number[]) => void
  constructor(props: Props) {
    super(props)
    this.state={
      data: null,
      isLoaded: false
    }
  }
  componentDidMount(){
    let date = new Date(Date.now());
    getAuthorizedAxiosInstance()
    .get(`Stats/products/?Month=${date.getMonth() + 1}&Year=${date.getFullYear()}`)
    .then((value: any) => {
      let min: number[] = [0,0,0];
      let mostPopular: number[] = [0,0,0];
      value.data.forEach((element:any) => {
        let minVal = Math.min(...min)
        if(element.amount >= minVal){
          let arr = min.indexOf(minVal);
          min[arr] = element.amount
          mostPopular[arr] = element;
        }
      });
      this.setState({
        ...this.state,
        data: mostPopular,
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
        {this.state.isLoaded ? <section className='product-overview'>
                {this.state.data.map((value: any) => {                  
                  return (  
                    <ProductComponent
                      product={value.product}
                      key={value.product.id}
                      onAdd={addToCart(this.props.cookies)}
                    />
                  )
                })}
                /</section> : <div>aan het laden</div>}
        
      </section>
    )
  }
}
