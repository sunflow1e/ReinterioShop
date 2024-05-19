import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentTitle from "../components/ContentTitle";
import ProductsContainer from "../components/ProductsContainer";


export class CataloguePage extends Component {
      
  render() {
    return (
        <div class = "Content">
            <div class = "PageTitle">
              <div class = "PageTitleTextContainer">
                <h1 class = "PageTitleText">Каталог Reinterio</h1>
              </div>

              <div class = "PageTitleLine"/>
            </div>
            <ProductsContainer user_id={this.props.user_id} onAdd={this.props.onAdd} onDelete={this.props.onDelete}/>
        <Header />
        <Footer />
    </div>
    )
  }
}

export default CataloguePage