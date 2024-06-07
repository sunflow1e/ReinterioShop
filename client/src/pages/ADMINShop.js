import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductsContainer from "../components/ProductsContainer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'


export class ADMINShop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            users_orders: [],
            orders: [],
        }
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllUsersOrders();
        this.getAllOrders();
    }

    getAllUsers() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/user`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ users: response.data })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getAllUsersOrders() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/user/orders`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ users_orders: response.data })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getAllOrders() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/orders`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ orders: response.data })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {

        let TODAY_ORDERS = 0;
        let TODAY_PRICE = 0;

        this.state.orders.filter(el => new Date(el.order_date).getDate() === new Date().getDate()).map(el => TODAY_PRICE += el.order_price);
        TODAY_ORDERS = this.state.orders.filter(el => new Date(el.order_date).getDate() === new Date().getDate()).length;

        let MONTH_ORDERS = 0;
        let MONTH_PRICE = 0;

        this.state.orders.filter(el => new Date(el.order_date).getMonth() === new Date().getMonth()).map(el => MONTH_PRICE += el.order_price);
        MONTH_ORDERS = this.state.orders.filter(el => new Date(el.order_date).getMonth() === new Date().getMonth()).length;

        let ALL_ORDERS = this.state.orders.length;
        let ALL_PRICE = 0;
        this.state.orders.map(el => ALL_PRICE += el.order_price);

        return (
            <>
                {this.props.user?.user_role === 1 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Магазин</h1>
                            </div>

                            <div class="PageTitleLine" />
                        </div>
                        <div>
                            <div className='PageCardsContainer'>
                                <div className='PageCards'>

                                    <div className='AnalyticsPageCard'>
                                        <p className='PageCardTitle'>Аналитика продаж</p>

                                        <p class='PageCardText'>Сегодня</p>
                                        <div className='StylesCategoriesContainer'>
                                            <div style={{ padding: "5px 15px", pointerEvents: "none", fontSize: "20px" }} className='SelectedBubble'>
                                                <i class='fi fi-rr-shopping-bag'></i>
                                                <p class='PageCardText'>{TODAY_ORDERS}</p>
                                            </div>

                                            <div style={{ padding: "5px 15px", pointerEvents: "none", fontSize: "20px" }} className='SelectedBubble'>
                                                <i class='fi fi-rr-credit-card'></i>
                                                <p class='PageCardText'>{new Intl.NumberFormat().format(TODAY_PRICE) + " ₽"}</p>
                                            </div>
                                        </div>

                                        <p class='PageCardText'>Месяц</p>
                                        <div className='StylesCategoriesContainer'>
                                            <div style={{ padding: "5px 15px", pointerEvents: "none", backgroundColor: "#F9F9FA", fontSize: "20px" }} className='Bubble'>
                                                <i class='fi fi-rr-shopping-bag'></i>
                                                <p class='PageCardText'>{MONTH_ORDERS}</p>
                                            </div>

                                            <div style={{ padding: "5px 15px", pointerEvents: "none", backgroundColor: "#F9F9FA", fontSize: "20px" }} className='Bubble'>
                                                <i class='fi fi-rr-credit-card'></i>
                                                <p class='PageCardText'>{new Intl.NumberFormat().format(MONTH_PRICE) + " ₽"}</p>
                                            </div>
                                        </div>

                                        <p class='PageCardText'>Всего</p>
                                        <div className='StylesCategoriesContainer'>
                                            <div style={{ padding: "5px 15px", pointerEvents: "none", backgroundColor: "#F9F9FA", fontSize: "20px" }} className='Bubble'>
                                                <i class='fi fi-rr-shopping-bag'></i>
                                                <p class='PageCardText'>{ALL_ORDERS}</p>
                                            </div>

                                            <div style={{ padding: "5px 15px", pointerEvents: "none", backgroundColor: "#F9F9FA", fontSize: "20px" }} className='Bubble'>
                                                <i class='fi fi-rr-credit-card'></i>
                                                <p class='PageCardText'>{new Intl.NumberFormat().format(ALL_PRICE) + " ₽"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='PageCard'>
                                        <p className='PageCardTitle'>Пользователи</p>

                                        <div class='CartSummaryInfoContainer'>
                                            <p class='PageCardText'>Всего в системе:</p>
                                            <p class='PageCardText'>{this.state.users.length}</p>
                                        </div>

                                        <div class='CartSummaryInfoContainer'>
                                            <p class='PageCardText'>Совершивших заказ:</p>
                                            <p class='PageCardText'>{this.state.users_orders.length}</p>
                                        </div>

                                        <a href='/admin/add_user'>
                                            <div className='ModalSecondaryButton'>
                                                <p class='PageCardText'>Новый пользователь</p>
                                                <i class='fi fi-rr-user-add'></i>
                                            </div>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <ADMINHeader />
                        <Footer />
                    </div>
                }
                {this.props.user?.user_role === 2 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Доступ запрещен</h1>
                            </div>

                            <div class="PageTitleLine" />
                        </div>

                        <div class='PageContent'>
                            <div class='CartCardsContainer'>
                                <div
                                    style={{ flexDirection: 'column', gap: '5px' }}
                                    class='CartCard'
                                >
                                    <p style={{ fontSize: '32px' }} class='AlertContainerTitle'>
                                        У вас нет доступа к данной странице
                                    </p>
                                    <a href='../catalogue'>
                                        <div class='MainButton'>Каталог товаров</div>
                                    </a>
                                </div>
                            </div>
                            <div class='PageSideContainer' />
                        </div>
                        <Header />
                        <Footer />
                    </div>
                }
            </>
        )
    }
}

export default ADMINShop