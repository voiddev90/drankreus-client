import * as React from "react"
import Axios, { AxiosResponse } from "axios";
import { ProductComponent } from "./Products/ProductComponent";
import { Product, getAuthorizedAxiosInstance, ProductResponse, Tag, Brand, Country } from "../model";
import { addToCart, isLoggedIn } from "../helpers";
import { ReactCookieProps, withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
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
        if (value.data.value.length < 3) {
          this.getRandomProduct();
        }
        else {
          let min: number[] = [0, 0, 0];
          let mostPopular: Product[] = [];
          value.data.value.forEach((element: any) => {
            let minVal = Math.min(...min)
            if (element.amount >= minVal) {
              let arr = min.indexOf(minVal);
              min[arr] = element.amount
              mostPopular[arr] = element.product;
            }
          });
          mostPopular.forEach(element => {
            Axios.get(`http://localhost:5000/api/Brand/${element.brandId}`)
              .then((value: AxiosResponse<Brand[]>) => {
                let f: Brand = { id: value.data[0].id, name: value.data[0].name }
                element.brandEntity = f
              })
            Axios.get(`http://localhost:5000/api/Country/${element.countryId}`)
              .then((value: AxiosResponse<Country[]>) => {
                let f: Country = { id: value.data[0].id, name: value.data[0].name }
                element.countryEntity = f
              })
          });
          this.setState({
            ...this.state,
            data: mostPopular,
            isLoaded: true
          })
        }
      })

  }
  getRandomProduct() {
    Axios.get(`http://localhost:5000/api/product/?Products=233&Products=334&products=889&ndex=0&size=100`)
      .then((value: AxiosResponse<ProductResponse>) => {
        this.setState({
          ...this.state,
          data: value.data.items,
          isLoaded: true
        })
      })
  }
  render() {
    document.title = "Drankreus - Home"
    return (
      <section className="home container-fluid">
        <div className='home-inner row align-center-vh'>
          <div className='description col-3'>
            <h1 className="content-title">Onze top 3</h1>
            <p><Link to='/products'>Bekijk alle producten<FontAwesomeIcon icon={faChevronRight} className='last' /></Link></p>
            <ul className='list-group why-drankreus'>
              <li className='list-group-item reason'>
                <FontAwesomeIcon icon={faCheck} className='first icon' size='sm' />Wij verzenden gratis vanaf €50.
              </li>
              <li className='list-group-item reason'>
                <FontAwesomeIcon icon={faCheck} className='first icon' size='sm' />Wij leveren snel, voor 21:00 uur besteld, morgen in huis
              </li>
              <li className='list-group-item reason'>
                <FontAwesomeIcon icon={faCheck} className='first icon' size='sm' />Wij houden op zijn tijd ook van een drankje, dus onze klantenservice staat graag voor u klaar.
              </li>
            </ul>
          </div>
          {(this.state.isLoaded) ? <div className='product-overview col-9 row'>
            {this.state.data.map((value: Product, index: number) => {
              return (
                <ProductComponent
                  product={value}
                  key={value.id}
                  onAdd={addToCart(this.props.cookies)}
                  className={`rank-${index + 1}`}
                />
              )
            })}
          </div> : <div>aan het laden</div>}
        </div>
      </section>
    )
  }
}
export default withCookies((HomeComponent) as any)
