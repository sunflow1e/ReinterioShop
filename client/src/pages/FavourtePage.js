import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import FavProductsContainer from "../components/FavProductsContainer";
import ADMINHeader from '../components/ADMINHeader';


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
        <FavProductsContainer user_id={this.props.user_id} onAdd={this.props.onAdd} admin={this.props.user?.user_role === 2 ? true : false} onDelete={this.props.onDelete} />
				{this.props.user?.user_role === 2 ?
				<ADMINHeader /> :
				<Header/> 
				}
      </div>
    )
  }
}

export default FavouritePage