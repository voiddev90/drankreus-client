import * as React from 'react'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { Order, Option, WithGetState, OrderResponse, getAuthorizedAxiosInstance } from '../model'
import { render } from 'react-dom'
import { OrderHistoryDetailComponent } from './OrderHistoryDetailComponent'

type Props = {
}
type OrderHistoryState = WithGetState<Order>

export default class OrderHistoryComponent extends React.Component<
  Props,
  OrderHistoryState
> {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'loading'
    }

    this.GetOrders = this.GetOrders.bind(this)
  }

  GetOrders() {
    getAuthorizedAxiosInstance().get(`http://localhost:5000/api/orders`)
      .then((value: AxiosResponse<OrderResponse>) => {
        this.setState({
          ...this.state,
          type: 'loaded',
          data: Option(value.data)
        })
      })
      .catch((value: AxiosError) => {
        this.setState({
          ...this.state,
          type: 'error',
          reason: value.response.status
        })
      })
  }

  componentDidMount() {
    this.GetOrders()
  }

  render() {
    switch (this.state.type) {
      case 'loading':
        return <>Orders worden geladen </>
      case 'loaded':
        switch (this.state.data.type) {
          case 'none':
            return <>We hebben geen orders van je kunnen vinden.</>
          case 'some':
            return (
              <section>
                <h3>Bestelgeschiedenis</h3>
                <p>Hieronder is een lijst te zien met jouw orders met daarin de producten die je in het verleden via onze webshop hebt besteld.</p>
                 <div>
                 {this.state.data.value.map((value: any) => {
                   console.log(value)
                    return (
                      <OrderHistoryDetailComponent
                        order={value}
                        key={value.id}
                        orderProduct={value.orderProduct}                       
                      />
                    )
                  })}
                </div>
              </section>
            )
        }
    }
  }
}
