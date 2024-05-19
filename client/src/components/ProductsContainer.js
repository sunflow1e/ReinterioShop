import React, { Component } from 'react'
import ProductCard from './ProductCard'
import axios from "axios";

export class ProductsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      products: [],
      favproducts: [],
      cartproducts: [],
    }
    this.getProductCards = this.getProductCards.bind(this);
    this.getFavouriteProductCards = this.getFavouriteProductCards.bind(this);
    this.getCartProductCards = this.getCartProductCards.bind(this);

    this.setFavouiteCartCards = this.setFavouiteCartCards.bind(this);
  }

  componentDidMount() {
    this.getProductCards();
    this.getFavouriteProductCards();
    this.getCartProductCards();
  }

  componentDidUpdate(){
    this.setFavouiteCartCards();
  }

  getProductCards() {
    const qs = require('qs');
    let data = qs.stringify({
    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/product/cards',
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

  getFavouriteProductCards() {
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
        this.setState({ favproducts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setFavouiteCartCards() {
    let allproducts = this.state.products;
    let favouriteproducts = this.state.favproducts;
    let crtproducts = this.state.cartproducts;

    for (let i = 0; i < allproducts.length; i++) {
      for (let j = 0; j < favouriteproducts.length; j++) {
        if (favouriteproducts[j].productd_id === allproducts[i].productd_id) {
          allproducts[i].product_addedtofavourite = true;
        }
      }
    }

    for (let i = 0; i < allproducts.length; i++) {
      for (let j = 0; j < crtproducts.length; j++) {
        if (crtproducts[j].productd_id === allproducts[i].productd_id) {
          allproducts[i].product_addedtocart = true;
        }
      }
    }
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.products).length > 0
          ? <div class="ProductsContainer">
            {this.state.products?.map(CurrentProduct => (
              <ProductCard key={CurrentProduct.productd_id} user_id={this.props.user_id} product={CurrentProduct} onChange={() => this.getProductCards()} />
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