import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderContainer from '../components/OrderContainer';
import axios from "axios";


export class MyOrdersPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Orders: [],
    }
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders() {
    const qs = require('qs')
    let data = qs.stringify({})

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url:
        `${process.env.REACT_APP_API_URL}/order/all/info/` +
        Number.parseInt(localStorage.getItem('userId')),
      headers: {},
      data: data,
    }

    axios
      .request(config)
      .then(response => {
        this.setState({ Orders: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div class="Content">
        <div class="PageTitle">
          <div class="PageTitleTextContainer">
            <h1 class="PageTitleText">Мои заказы</h1>
          </div>

          <div class="PageTitleLine" />
        </div>

        <div className='AllOrdersContainer'>
        {this.state.Orders?.map(order => (
          <OrderContainer
            key={order.order_id}
            user_id={localStorage.getItem('userId')}
            order={order}
          />
        ))}
        </div>

        <Header />
        <Footer />
      </div>
    )
  }
}

export default MyOrdersPage