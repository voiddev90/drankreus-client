import * as React from 'react'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { Order, Option, WithGetState, OrderResponse, getAuthorizedAxiosInstance } from '../model'
import { render } from 'react-dom'
import { OrderHistoryDetailComponent } from './OrderHistoryDetailComponent'
import { SideBar } from './UI/SideBar';
import { AccountMenuComponent } from './Menu/AccountMenuComponent';

type Props = {
}
type OrderHistoryState = WithGetState<OrderResponse[]>

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
      .then((value: AxiosResponse<OrderResponse[]>) => {
        console.log(value)
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
              <section className='history container-fluid'>
                <div className='history-inner row align-center-vh'>
                  <div className='history-items-wrapper col-5'>
                    <h3>Bestellingsgeschiedenis</h3>
                    <div className='history-items-table-wrapper'>
                      <table className='history-items-table'>
                        <thead>
                          <tr>
                            <th className='product' colSpan={5}>Product</th>
                            <th className='price'>Prijs</th>
                            <th className='amount'>Aantal</th>
                          </tr>
                        </thead>
                        {this.state.data.value.map((value: OrderResponse) => {
                          return (
                            <OrderHistoryDetailComponent
                              order={value.order}
                              key={value.order.id}
                              orderProduct={value.orderProduct}
                            />
                          )
                        })}
                      </table>
                    </div>
                  </div>
                  <SideBar type='blank' size={3} extraClasses={['height', 'account-side-menu-wrapper']}>
                    <AccountMenuComponent />
                  </SideBar>
                </div>
              </section>
            )
        }
    }
  }
}
