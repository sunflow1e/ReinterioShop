import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeScreen from "../components/WelcomeScreen";
import BannerFirstType from "../components/BannerFirstType";
import ContentTitle from "../components/ContentTitle";
import ProductsContainer from "../components/ProductsContainer";
import BannerSecondType from "../components/BannerSecondType";
import AboutReinterio from "../components/AboutReinterio";
import CategoriesContainer from "../components/CategoriesContainer";
import ADMINHeader from '../components/ADMINHeader';

export class HomePage extends Component {

  render() {
    return (
      <div className='Content'>
        <WelcomeScreen />
        <BannerFirstType />
        <div id='Categories'></div>
        <ContentTitle ContentText="Популярные категории" />
        <CategoriesContainer categories={this.props.categories} />
        <BannerSecondType />
        <AboutReinterio />
        <ContentTitle ContentText="Каталог товаров" />
        <ProductsContainer user_id={this.props.user_id} onAdd={this.props.onAdd} onDelete={this.props.onDelete} admin={this.props.user?.user_role === 2 ? true : false} />
				{this.props.user?.user_role === 2 ?
				<ADMINHeader /> :
				<Header/> 
				}
        <Footer />
      </div>
    )
  }
}

export default HomePage