import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NoPage from "./pages/NoPage";
import CataloguePage from "./pages/CataloguePage";
import FavouritePage from "./pages/FavourtePage";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import { ProductPage } from "./pages/ProductPage";
import RegistrationPage from "./pages/RegistrationPage";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loggeduser_id: 1,
      products: [],

      categories: [],
      cartproducts: [],
      current_user: [],
    };
  }


  componentDidMount() {
    this.getCategories();
    this.getCurrentUser();

    this.getProductCards();

  }

  getCategories() {
    const requestOptions = {
      method: "GET"
    };

    fetch("http://127.0.0.1:5000/category", requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ categories: result }))
      .catch((error) => console.error(error));

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/category/',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getCurrentUser() {
    const qs = require('qs');
    let data = qs.stringify({
    });

    let user_id = this.state.loggeduser_id;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/user/:id',
      headers: {
        'id': user_id
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        this.setState({ current_user: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getProductCards() {
    const qs = require('qs');
    let data = qs.stringify({
    });

    let user_id = this.state.loggeduser_id;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/product/cards/',
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

  render() {

    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage user_id={this.state.loggeduser_id} categories={this.state.categories} cartproducts={this.state.cartproducts} onAdd={this.addToCart} onDelete={this.deleteFromCart} />}></Route>
            <Route path="/home" element={<HomePage user_id={this.state.loggeduser_id} onCountChange={this.changeCountCart} onSelectedChange={this.changeSelectedCart} products={this.state.products} categories={this.state.categories} cartproducts={this.state.cartproducts} onAdd={this.addToCart} onDelete={this.deleteFromCart} />} />

            <Route path="/cart" element={<CartPage user_id={this.state.loggeduser_id} onDelete={this.deleteFromCart} />} />

            <Route path="/favourite" element={<FavouritePage user_id={this.state.loggeduser_id} />} />
            <Route path="/catalogue" element={<CataloguePage user_id={this.state.loggeduser_id} />} />

            <Route path="/profile" element={this.state.current_user.length > 0 ? <ProfilePage user={this.state.current_user[0]} /> : null} />

            <Route path="/product/:product_id" element={<ProductPage user_id={this.state.loggeduser_id}/>} />



            <Route path="/registration" element={<RegistrationPage/>} />


            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
