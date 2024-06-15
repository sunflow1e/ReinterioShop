import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductsContainer from "../components/ProductsContainer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import OrderContainer from '../components/OrderContainer';
import OrderCard from '../components/OrderCard';


export class ADMINProducts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      products: [],
    }
  }

  componentDidMount() {
    this.getAllOrders();
    this.getProductCards();
  }
	getProductCards() {

		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `${process.env.REACT_APP_API_URL}/product/cards/`,
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				this.setState({ products: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

  getAllOrders() {
    const qs = require('qs');
    let data = qs.stringify({

    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/orders`,
      headers: {},
      data: data
    };

    axios.request(config)
      .then((response) => {
        this.setState({ orders: response.data })
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {

    return (
      <>
        {this.props.user?.user_role === 1 &&
          <div class="Content">
            <div class="PageTitle">
              <div class="PageTitleTextContainer">
                <h1 class="PageTitleText">Товары</h1>


                <div class='PageTitleButtonsContainer'>
                  <a href='/admin/product/add'>
                    <div className='AdminTitleButton'>Добавить товар</div>
                  </a>
                </div>
              </div>

              <div class="PageTitleLine"></div>
            </div>
            <div>
              <div style={{ marginBottom: "30px" }} className='PageCards'>

                <div style={{ gap: "10px" }} className='PageCard'>
                  <p className='PageCardTitle'>Характеристики</p>
                  <a href='/admin/edit/style'><div className='ModalSecondaryButton'>Управление стилями</div></a>
                  <a href='/admin/edit/shape'><div className='ModalSecondaryButton'>Управление формами</div></a>
                  <a href='/admin/edit/material'><div className='ModalSecondaryButton'>Управление материалами</div></a>
                  <a href='/admin/edit/category'><div className='ModalSecondaryButton'>Управление категориями</div></a>
                </div>

                <div className='AnalyticsPageCard'>
                  <p className='PageCardTitle'>Эти товары скоро закончатся</p>
                  <div className='OrderProdContainer'>
                    {this.state.products?.filter(el => el.productd_onstock < 15).map(product => (
                      <OrderCard
                        stock={true}
                        key={product.productd_id}
                        user_id={localStorage.getItem('userId')}
                        product={product}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
            <div class="PageTitleTextContainer">
                <h1 class="PageTitleText">Каталог</h1>
              </div>
            <ProductsContainer user_id={this.props.user_id} admin={true} />
            <ADMINHeader />
            <Footer />
          </div>
        }
        {this.props.user?.user_role === 2 &&
          <div class="Content">
            <div class="PageTitle">
              <div class="PageTitleTextContainer">
                <h1 class="PageTitleText">Доступ запрещен</h1>
              </div>

              <div class="PageTitleLine" />
            </div>

            <div class='PageContent'>
              <div class='CartCardsContainer'>
                <div
                  style={{ flexDirection: 'column', gap: '5px' }}
                  class='CartCard'
                >
                  <p style={{ fontSize: '32px' }} class='AlertContainerTitle'>
                    У вас нет доступа к данной странице
                  </p>
                  <a href='../catalogue'>
                    <div class='MainButton'>Каталог товаров</div>
                  </a>
                </div>
              </div>
              <div class='PageSideContainer' />
            </div>
            <Header />
            <Footer />
          </div>
        }
      </>
    )
  }
}

export default ADMINProducts