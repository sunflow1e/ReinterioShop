import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductsContainer from "../components/ProductsContainer";
import ADMINHeader from '../components/ADMINHeader';


export class SearchPage extends Component {

  render() {
    return (
      <div class="Content">
        <div class="PageTitle">
          <div class="PageTitleTextContainer">
            <h1 class="PageTitleText">Результаты поиска</h1>
          </div>

          <div class="PageTitleLine" />
        </div>
        <ProductsContainer filter={true} user_id={this.props.user_id} admin={this.props.user?.user_role === 2 ? true : false} />
				{this.props.user?.user_role === 2 ?
				<ADMINHeader /> :
				<Header/> 
				}
        <Footer />
      </div>
    )
  }
}

export default SearchPage