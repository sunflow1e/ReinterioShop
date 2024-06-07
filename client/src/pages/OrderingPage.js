import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import CartProductContainer from '../components/CartProductContainer';
import DeliveryContainer from '../components/DeliveryContainer';
import { CSSTransition } from 'react-transition-group';

export class OrderingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart_products: [],
      delivery: [],
      current_delivery: [],
      current_delivery_id: 0,

      ShowError: false,
      ErrorText: "Поля не могут быть пустыми. Нам необходим адрес для отправки товара и номер телефона, чтобы курьер мог с вами связаться"
    };
    this.changeCountCart = this.changeCountCart.bind(this);
    this.changeCurrentDelivery = this.changeCurrentDelivery.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('OrdertingProducts'))) {
      this.setState({ cart_products: JSON.parse(localStorage.getItem('OrdertingProducts')) });
      this.getDeliveries();
      this.getCurrentDelivery();
    }
  }

  getDeliveries() {
    const qs = require('qs');
    let data = qs.stringify({

    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/order/delivery`,
      headers: {},
      data: data
    };

    axios.request(config)
      .then((response) => {
        this.setState({ delivery: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCurrentDelivery() {
    const qs = require('qs');
    let data = qs.stringify({

    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/order/delivery/${this.state.current_delivery_id}`,
      headers: {},
      data: data
    };

    axios.request(config)
      .then((response) => {
        this.setState({ current_delivery: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let ProductsCost = 0;
    this.state.cart_products.filter(CurrentProduct => CurrentProduct.product_isselected === true).forEach(CurrentProduct => ProductsCost += Number.parseFloat(CurrentProduct.product_price) * Number.parseFloat(CurrentProduct.cart_count));

    let TotalDiscount = 0;
    this.state.cart_products.forEach(CurrentProduct => {
      if (CurrentProduct.product_discount !== '0' && CurrentProduct.product_isselected === true) {
        TotalDiscount += (Number.parseFloat(CurrentProduct.product_price) - Number.parseFloat(CurrentProduct.product_disc_price)) * Number.parseFloat(CurrentProduct.cart_count);
      }
    });

    let TotalProducts = 0;
    this.state.cart_products.forEach(CurrentProduct => {
      if (CurrentProduct.product_isselected === true) {
        TotalProducts += (Number.parseFloat(CurrentProduct.cart_count));
      }
    });

    let FullWeight = 0;
    this.state.cart_products.forEach(CurrentProduct => {
      if (CurrentProduct.product_isselected === true) {
        FullWeight += (Number.parseFloat(CurrentProduct.product_weight) * Number.parseFloat(CurrentProduct.cart_count));
      }
    });

    let MaxWeight = 0;
    this.state.current_delivery.forEach(CurrentD => {
      MaxWeight = CurrentD.delivery_minprice / CurrentD.delivery_weightprice;
    });
    MaxWeight = Math.round(MaxWeight);

    let DeliveryPrice = Intl.NumberFormat().format(0);

    if (FullWeight >= MaxWeight) {
      this.state.current_delivery.forEach(CurrentD => {
        DeliveryPrice = CurrentD.delivery_weightprice * FullWeight;
      });
    }
    else {
      this.state.current_delivery.forEach(CurrentD => {
        DeliveryPrice = CurrentD.delivery_minprice;
      });
    }

    let FreeDelivery = false;

    this.state.current_delivery.forEach(CurrentD => {
      if (ProductsCost > 7000 && CurrentD.delivery_id === 0) {
        DeliveryPrice = 0;
        FreeDelivery = true;
      }
    });

    let TotalCost = ProductsCost - TotalDiscount + DeliveryPrice;


    let CurrentDate = new Date();
    let DeliDate = new Date();

    this.state.current_delivery.forEach(CurrentD => {
      DeliDate.setDate(CurrentDate.getDate() + CurrentD.delivery_days);
    });

    DeliDate.setDate(DeliDate.getDate() + 1);
    CurrentDate.setDate(CurrentDate.getDate() + 1);

    CurrentDate = CurrentDate.toISOString().slice(0, 10);
    DeliDate = DeliDate.toISOString().slice(0, 10);

    return (
      <div class="PPContent">
        <div class="PageTitleContainer">

          <div class="PageTitle">
            <div class="PageTitleTextContainer">
              <h1 class="PageTitleText">Оформление заказа</h1>
            </div>

            <div class="PageTitleLine" />
          </div>

          <div class="PageSideContainer" />
        </div>

        {Object.keys(this.state.cart_products).length > 0 ?
          <div class="PageContent">
            <div className='CartCardsContainer'>
              <div className='PageCards'>
                <div className='PageCard'>
                  <p className='PageCardTitle'>Контактные данные</p>
                  <p className='PageCardText'>Номер телефона для связи</p>
                  {Object.keys(this.props.user).length > 0 &&
                    <input
                      id='profile_phone'
                      pattern='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$'
                      type='tel'
                      maxLength='12'
                      className='MainTextArea'
                      defaultValue={this.props.user[0].user_phone}
                    ></input>
                  }

                  <p className='PageCardText'>Адрес доставки</p>
                  {Object.keys(this.props.user).length > 0 &&
                    <input
                      pattern='[А-Яа-я]+'
                      id='profile_address'
                      type='text'
                      maxLength='70'
                      className='MainTextArea'
                      defaultValue={this.props.user[0].user_address}
                      placeholder='Например: Москва, ул. Реинтерная 28, кв 15'
                    ></input>
                  }

                  <CSSTransition
                    in={this.state.ShowError}
                    timeout={1000}
                    classNames='smallalert'
                    unmountOnExit
                  >
                    <p style={{ color: '#E04E20' }} className='PageCardText'>
                      {this.state.ErrorText}
                    </p>
                  </CSSTransition>

                </div>
                <div className='PageCard'>
                  <p className='PageCardTitle'>Доставка</p>
                  <DeliveryContainer onChangeSelected={this.changeCurrentDelivery} FullWeight={FullWeight} currentdelivery={this.state.current_delivery_id} delivery={this.state.delivery} />
                </div>
              </div>
              <h1 class="PageTitleText">Состав заказа</h1>
              <CartProductContainer ShowSmallButtons={false} cartproducts={this.state.cart_products} onCountChange={this.changeCountCart} />
            </div>
            <div class="PageSideContainer">
              {TotalProducts > 0 &&
                <div class="CartSummaryContainer">
                  <div class="CartSummaryInfoContainer">
                    <p class="BlockContainerTitle">Оформление</p>
                  </div>

                  <div class="CartSummaryInfoContainer">
                    <p class="SideContainerText">{"Товары (" + TotalProducts + ")"}</p>
                    <p class="SideContainerText">{new Intl.NumberFormat().format(ProductsCost) + " ₽"}</p>
                  </div>

                  {TotalDiscount > 0 &&
                    <div class="CartSummaryInfoContainer">
                      <p class="SideContainerText">Скидка</p>
                      <p class="SideContainerText">{"-" + new Intl.NumberFormat().format(TotalDiscount) + " ₽"}</p>
                    </div>
                  }

                  <div class="CartSummaryInfoContainer">
                    <p class="SideContainerText">Доставка</p>
                    <p class="SideContainerText">{new Intl.NumberFormat().format(DeliveryPrice) + " ₽"}</p>
                  </div>


                  <div class="CartSummaryInfoContainer">
                    <p class="SideContainerText"><b>Итого</b></p>
                    <p class="SideContainerText"><b>{new Intl.NumberFormat().format(TotalCost) + " ₽"}</b></p>
                  </div>

                  <div onClick={() => this.getOrder(TotalCost, CurrentDate, DeliDate, DeliveryPrice)} class="SideContainerBuyButton">
                    <p>К оплате</p>
                    <p class="SideContainerBuyButtonPrice">{new Intl.NumberFormat().format(TotalCost) + " ₽"}</p>
                  </div>

                  <CSSTransition
                    in={FreeDelivery}
                    timeout={1000}
                    classNames='smallalert'
                    unmountOnExit
                  >
                    <div>
                      <p style={{ color: 'black', marginTop: '20px' }} className='PageCardText'>
                        Бесплатная доставка при заказе от 7 000 ₽!
                      </p>

                      <p style={{ color: '#B4A39A', marginTop: '10px', fontSize: "16px" }} className='PageCardText'>
                        Распространяется только на стандартную доставку
                      </p>
                    </div>
                  </CSSTransition>
                </div>
              }
            </div>
          </div>
          :
          <div class="PageContent">
            <div class="CartCardsContainer">
              <div style={{ flexDirection: "column", gap: "5px" }} class="CartCard">
                <p style={{ fontSize: "32px" }} class="AlertContainerTitle">Пока тут ничего нет</p>
                <p style={{ marginBottom: "20px" }} class="AlertContainerText">Подберите лучшую мебель для вашего дома с нашим каталогом товаров </p>
                <a href="../catalogue"><div class="MainButton">Каталог товаров</div></a>
              </div>
            </div>
            <div class="PageSideContainer" />
          </div>
        }
        <Header />
        <Footer />
      </div >
    )
  }

  getOrder(price, date, deliverydate, deliprice) {
    this.setState({ ShowError: false })

    if (this.CheckPhone() && this.CheckAddress()) {
      this.updateProfileAddress();
      this.updateProfilePhone();
      this.postOrder(price, date, deliverydate, deliprice);

      this.state.cart_products.forEach(CurrentP => {
        this.postOrderProducts(CurrentP.productd_id, CurrentP.cart_count, CurrentP.product_disc_price);
      });

      this.state.cart_products.forEach(CurrentP => {
        this.waitingForReview(CurrentP.productd_id);
      });

      this.deleteFromCart();

      localStorage.removeItem('OrdertingProducts')
      window.location.href = '/gratitude'
    }
    else if (!this.CheckPhone()) {
      this.setState({ ShowError: true })
      this.setState({ ErrorText: 'Введите действительный номер телефона. Он нужен, чтобы курьер мог с вами связаться' })
    }
    else if (!this.CheckAddress()) {
      this.setState({ ShowError: true })
      this.setState({ ErrorText: 'Введите действительный адрес доставки' })
    }
    else {
      this.setState({ ShowError: true })
      this.setState({ ErrorText: 'Произошла непредвиденная ошибка. Повторите позже' })
    }
  }

  waitingForReview(product) {
    const qs = require('qs');
    let data = qs.stringify({
      'userid': localStorage.getItem("userId"),
      'productid': product,
      'rating': 0,
      'image1': '',
      'image2': '',
      'image3': '',
      'image4': '',
      'image5': '',
      'date': '31-05-2023'
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/rating/add',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }

  postOrder(price, date, deliverydate, deliprice) {
    const qs = require('qs');
    let data = qs.stringify({
      'userid': localStorage.getItem("userId"),
      'date': date,
      'delivdate': deliverydate,
      'price': price,
      'deliid': this.state.current_delivery_id,
      'address': document.getElementById('profile_address').value,
      'deliprice': deliprice
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/order`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }

  postOrderProducts(product, count, price) {
    const qs = require('qs');
    let data = qs.stringify({
      'product': product,
      'price': price,
      'count': count,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/order/details`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFromCart() {
    this.state.cart_products?.map(CurrentCartProduct =>
      this.deleteProductFromBD(CurrentCartProduct.productd_id)
    )
  }

  deleteProductFromBD(productid) {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('user', localStorage.getItem('userId'))
    urlencoded.append('product', productid)

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    }

    fetch(`${process.env.REACT_APP_API_URL}/cart/`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }














  CheckPhone() {
    var inputphone = document.getElementById('profile_phone')

    if (inputphone.checkValidity() && inputphone.value !== '') {
      var digits = inputphone.value.replace(/^8/, '7').replace(/[^\d]+/, '')
      document.getElementById('profile_phone').value = "+" + digits.replace(
        /^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/,
        '$1 $2 $3 $4 $5'
      )
      return true
    } else {
      return false
    }
  }

  CheckAddress() {
    if (document.getElementById('profile_address').value !== '') {
      return true
    }
    else {
      return false
    }
  }

  updateProfileAddress() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append(
      'address',
      document.getElementById('profile_address').value
    )

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    }

    fetch(
      `${process.env.REACT_APP_API_URL}/user/updateaddress/` + localStorage.getItem("userId"),
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  updateProfilePhone() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append(
      'phone',
      document.getElementById('profile_phone').value
    )

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    }

    fetch(
      `${process.env.REACT_APP_API_URL}/user/updatephone/` + localStorage.getItem("userId"),
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }



  changeCountCart(productid, newcount) {
    const productindex = this.state.cart_products.map(a => a.productd_id).indexOf(productid);

    const originproducts = this.state.cart_products;
    originproducts[productindex].cart_count = newcount;
    this.setState({ cart_products: originproducts });
  }

  changeCurrentDelivery(deliveryid) {
    let cur_del = this.state.current_delivery;
    let all_del = this.state.delivery;

    cur_del = all_del.filter(d => d.delivery_id === deliveryid);

    this.setState({ current_delivery: cur_del });
    this.setState({ current_delivery_id: deliveryid });
  }
}


export default OrderingPage