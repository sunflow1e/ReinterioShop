import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ADMINHeader from '../components/ADMINHeader';

export class NoPage extends Component {
  render() {
    return (
      <div classname="Content">
        <div class="Content">
          <div>Упс! Страница не найдена</div>
        </div>
				{this.props.user?.user_role === 2 ?
				<ADMINHeader /> :
				<Header/> 
				}
        <Footer />
      </div>
    )
  }
}

export default NoPage