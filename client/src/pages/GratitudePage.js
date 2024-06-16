import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ADMINHeader from '../components/ADMINHeader';

export class GratitudePage extends Component {
    render() {
        return (
            <div class="Content">
                <div class="PageTitle">
                    <div class="PageTitleTextContainer">
                        <h1 class="PageTitleText">Спасибо за заказ!</h1>
                    </div>

                    <div class="PageTitleLine" />
                </div>

                <div>
                    <h3 style={{ lineHeight: "150%", fontSize: "24px" }}>Благодарим за доверие бренду Reinterio</h3>
                    <p style={{ lineHeight: "150%", fontSize: "20px" }}>Менеджер свяжется с вами для уточнения деталей. Отслеживать статус заказа можно на странице «Аккаунт». </p>
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

export default GratitudePage