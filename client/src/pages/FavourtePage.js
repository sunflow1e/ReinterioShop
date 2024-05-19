import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import FavProductsContainer from "../components/FavProductsContainer";


export class FavouritePage extends Component {
  render() {
    return (
      <div class="Content">
        <div class="PageTitle">
          <div class="PageTitleTextContainer">
            <h1 class="PageTitleText">Избранные товары</h1>
          </div>

          <div class="PageTitleLine" />
        </div>
        <FavProductsContainer user_id={this.props.user_id} onAdd={this.props.onAdd} onDelete={this.props.onDelete} />
        <Header />
        <Footer />
      </div>
    )
  }
}

export default FavouritePage