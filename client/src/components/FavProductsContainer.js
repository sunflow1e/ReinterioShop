import React, { Component } from 'react'
import ProductCard from './ProductCard'
import axios from "axios";

export class ProductsContainer extends Component {

  constructor(props) {
    super(props)
    this.DeleteFromFav = this.DeleteFromFav.bind(this);
    this.state = {
      products: [],
      cartproducts: [],
    }
  }

  componentDidMount() {
    this.getFavProductCards();
    this.getCartProductCards();
    this.forceUpdate()
  }

  componentDidUpdate(){
    this.setCartCards();
  }

  getFavProductCards() {
    const qs = require('qs');
    let data = qs.stringify({
    });

    let user_id = this.props.user_id;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/product/favourite/' + Number.parseInt(user_id),
      headers: {},
      data: data
    };

    axios.request(config)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

      this.forceUpdate();
  }

  getCartProductCards() {
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
        this.setState({ cartproducts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setCartCards() {
    let allproducts = this.state.products;
    let crtproducts = this.state.cartproducts;

    for (let i = 0; i < allproducts.length; i++) {
      for (let j = 0; j < crtproducts.length; j++) {
        if (crtproducts[j].productd_id === allproducts[i].productd_id) {
          allproducts[i].product_addedtocart = true;
        }
      }
    }
  }

  DeleteFromFav(productid) {
    let originproducts = this.state.products;
    originproducts = originproducts.filter(a => a.productd_id !== productid);
    this.setState({ products: originproducts });
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.products).length > 0
          ? <div class="ProductsContainer">
            {this.state.products?.map(CurrentProduct => (
              <ProductCard key={CurrentProduct.productd_id} user_id={this.props.user_id} product={CurrentProduct} DeleteFromFav={this.DeleteFromFav} />
            ))}
          </div>
          : <div class="PageContent" >
            <div class="CartCardsContainer">
              <div style={{ flexDirection: "column", gap: "5px" }} class="CartCard">
                <h style={{ fontSize: "32px" }} class="AlertContainerTitle">Пока тут ничего нет</h>
                <h style={{ marginBottom: "20px" }} class="AlertContainerText">Подберите лучшую мебель для вашего дома с нашим каталогом товаров </h>
                <a href="../catalogue"><div class="MainButton">Каталог товаров</div></a>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ProductsContainer