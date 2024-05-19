import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import CartProductContainer from '../components/CartProductContainer';

export class OrderingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart_products: [],
    };
    this.changeCountCart = this.changeCountCart.bind(this);
    this.changeSelectedCart = this.changeSelectedCart.bind(this);
    this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
  }

  componentDidMount() {
    this.getCartProductCards();
  }

  getOrderCards() {
    const qs = require('qs');
    let data = qs.stringify({
    });

    let user_id = this.props.user_id;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/product/cart/' + Number.parseInt(user_id),
      headers: {},
      data: data
    };

    axios.request(config)
      .then((response) => {
        this.setState({ cart_products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    this.forceUpdate();
  }


  render() {
    let CurrentDate = new Date();
    CurrentDate.setDate(CurrentDate.getDate() + 15);

    var DelieveryDate = CurrentDate.toLocaleString('ru', {
      month: 'long',
      day: 'numeric'
    });

    let ProductsCost = 0;
    this.state.cart_products.filter(CurrentProduct => CurrentProduct.product_isselected === true).forEach(CurrentProduct => ProductsCost += Number.parseFloat(CurrentProduct.product_price) * Number.parseFloat(CurrentProduct.cart_count));

    let TotalDiscount = 0;
    this.state.cart_products.forEach(CurrentProduct => {
      if (CurrentProduct.product_discount !== '0' && CurrentProduct.product_isselected === true) {
        TotalDiscount += (Number.parseFloat(CurrentProduct.product_price) - Number.parseFloat(CurrentProduct.product_disc_price)) * Number.parseFloat(CurrentProduct.cart_count);
      }
    });

    let TotalCost = ProductsCost + DelieveryPrice;

    let TotalProducts = 0;
    this.state.cart_products.forEach(CurrentProduct => {
      if (CurrentProduct.product_isselected === true) {
        TotalProducts += (Number.parseFloat(CurrentProduct.cart_count));
      }
    });


    return (
      <div class="PPContent">
        <div class="PageTitleContainer">

          <div class="PageTitle">
            <div class="PageTitleTextContainer">
              <h1 class="PageTitleText">Корзина</h1>
              {Object.keys(this.state.cart_products).length > 0 &&
                <div class="PageTitleButtonsContainer">
                  {this.state.cart_products.find(CurrentProd => CurrentProd.product_isselected === true) &&
                    <div onClick={() => this.deleteAllSelected()} id="DeleteSelected" class="PageTitleButton"><i class="fi fi-sr-trash"></i>Удалить выбранное</div>
                  }
                  <div onClick={() => this.SelectAllProducts()} id="SelectAll" class="PageTitleButton"><i class="fi fi-sr-checkbox"></i>
                    {this.state.cart_products.find(CurrentProd => CurrentProd.product_isselected === true)
                      ? 'Убрать выделение'
                      : 'Выделить все'
                    }
                  </div>

                </div>
              }
            </div>

            <div class="PageTitleLine" />
          </div>

          <div class="PageSideContainer" />
        </div>

        {Object.keys(this.state.cart_products).length > 0 ?
          <div class="PageContent">
            <CartProductContainer cartproducts={this.state.cart_products} onDeleteProduct={this.deleteProductFromCart} onSelectedChange={this.changeSelectedCart} onCountChange={this.changeCountCart} />
            <div class="PageSideContainer">
              {TotalProducts > 0 &&
                <div class="CartSummaryContainer">
                  <div class="CartSummaryInfoContainer">
                    <h class="BlockContainerTitle">Ваша корзина</h>
                  </div>

                  <div class="CartSummaryInfoContainer">
                    <h class="SideContainerText">{"Товары (" + TotalProducts + ")"}</h>
                    <h class="SideContainerText">{new Intl.NumberFormat().format(ProductsCost) + " ₽"}</h>
                  </div>

                  {TotalDiscount > 0 &&
                    <div class="CartSummaryInfoContainer">
                      <h class="SideContainerText">Скидка</h>
                      <h class="SideContainerText">{"-" + new Intl.NumberFormat().format(TotalDiscount) + " ₽"}</h>
                    </div>
                  }

                  <div class="CartSummaryInfoContainer">
                    <h class="SideContainerText"><b>Итого</b></h>
                    <h class="SideContainerText"><b>{new Intl.NumberFormat().format(TotalCost) + " ₽"}</b></h>
                  </div>

                  <div class="SideContainerBuyButton">
                    <h>К оформлению</h>
                    <h class="SideContainerBuyButtonPrice">{new Intl.NumberFormat().format(TotalCost) + " ₽"}</h>
                  </div>
                  <h class="SideContainertDelieveryDate">Выбрать способ доставки можно при оформлении заказа</h>
                </div>
              }
            </div>
          </div>
          :
          <div class="PageContent">
            <div class="CartCardsContainer">
              <div style={{ flexDirection: "column", gap: "5px" }} class="CartCard">
                <h style={{ fontSize: "32px" }} class="AlertContainerTitle">Пока тут ничего нет</h>
                <h style={{ marginBottom: "20px" }} class="AlertContainerText">Подберите лучшую мебель для вашего дома с нашим каталогом товаров </h>
                <a href="../catalogue"><div class="MainButton">Каталог товаров</div></a>
              </div>
            </div>
            <div class="PageSideContainer" />
          </div>
        }
        <Header />
        <Footer />
      </div>
    )
  }

  SelectAllProducts() {
    const originProduts = this.state.cart_products;
    let ContainsSelected = this.state.cart_products.find(CurrentProd => CurrentProd.product_isselected === true);

    console.log(ContainsSelected);

    if (ContainsSelected) {
      originProduts.forEach(CurrentProd => CurrentProd.product_isselected = false);
    }
    else {
      originProduts.forEach(CurrentProd => CurrentProd.product_isselected = true);
    }

    this.setState({ cart_products: originProduts });
  }

  changeCountCart(productid, newcount) {
    const productindex = this.state.cart_products.map(a => a.productd_id).indexOf(productid);

    const originproducts = this.state.cart_products;
    originproducts[productindex].cart_count = newcount;
    this.setState({ cart_products: originproducts });
  }

  changeSelectedCart(productid, selection) {
    const productindex = this.state.cart_products.map(a => a.productd_id).indexOf(productid);
    const originproducts = this.state.cart_products;
    originproducts[productindex].product_isselected = selection;

    this.setState({ cart_products: originproducts });
  }

  deleteProductFromCart(productid) {
    let originproducts = this.state.cart_products;
    originproducts = originproducts.filter(a => a.productd_id !== productid);
    this.setState({ cart_products: originproducts });

    this.deleteProductFromBD(productid);
  }

  deleteProductFromBD(productid) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("user", this.props.user_id);
    urlencoded.append("product", productid);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("http://localhost:5000/cart/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  deleteAllSelected(){
    let originproducts = this.state.cart_products.filter(a => a.product_isselected === true);
    originproducts?.map(CurrentCartProduct => this.deleteProductFromBD(CurrentCartProduct.productd_id));
    originproducts = this.state.cart_products.filter(a => a.product_isselected === false);
    this.setState({ cart_products: originproducts });
  }
}

export default OrderingPage