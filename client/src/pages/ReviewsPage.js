import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderContainer from '../components/OrderContainer';
import axios from "axios";
import CartProductContainer from '../components/CartProductContainer';
import ReviewCard from '../components/ReviewCard';
import ADMINHeader from '../components/ADMINHeader';



export class ReviewsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Products: [],
    }
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    const qs = require('qs')
    let data = qs.stringify({})

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url:
        `${process.env.REACT_APP_API_URL}/review/all/` +
        Number.parseInt(localStorage.getItem('userId')),
      headers: {},
      data: data,
    }

    axios
      .request(config)
      .then(response => {
        this.setState({ Products: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div class="Content">
        <div class="PageTitle">
          <div class="PageTitleTextContainer">
            <h1 class="PageTitleText">Мои отзывы</h1>
          </div>

          <div class="PageTitleLine" />
        </div>
        <div class='PageContent'>
          <div style={{ flexDirection: "column-reverse" }} className='CartCardsContainer'>
            {this.state.Products?.map(prod => (
              <ReviewCard
                key={prod.productd_id}
                user_id={localStorage.getItem('userId')}
                product={prod}
              />
            ))}
          </div>

          <div class='PageSideContainer'>
            <div class='CartSummaryContainer'>
              <div class='CartSummaryInfoContainer'>
                <p class='PageCardText'>Ваш отзыв помогает другим клиентам с выбором</p>
              </div>
              <b style={{ marginTop: "15px" }} class='PageCardText'>{this.state.Products.filter(prd => prd.review_rating > 0).length + ' / ' + this.state.Products.length + ' товаров оценено'}</b>
            </div>
          </div>
        </div>

				{this.props.user?.user_role === 2 ?
				<ADMINHeader /> :
				<Header/> 
				}
      </div>
    )
  }
}

export default ReviewsPage