import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import OrderContainer from '../components/OrderContainer';


export class ADMINOrders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],
        }
    }

    componentDidMount() {
        this.getAllOrders();
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

        return (
            <>
                {this.props.user?.user_role === 2 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Заказы</h1>

                                <div class='PageTitleButtonsContainer'>
                                    <a href='/admin/edit/status'>
                                        <div className='AdminTitleButton'>Редактировать статусы заказов</div>
                                    </a>

                                    <a href='/admin/edit/delivery'>
                                        <div className='AdminTitleButton'>Редактировать способы доставок</div>
                                    </a>
                                </div>
                            </div>

                            <div class="PageTitleLine"></div>
                        </div>
                        <div>

                        </div>
                        <div className='AllOrdersContainer'>
                            {this.state.orders?.map(order => (
                                <OrderContainer
                                    admin={true}
                                    key={order.order_id}
                                    user_id={localStorage.getItem('userId')}
                                    order={order}
                                />
                            ))}
                        </div>
                        <ADMINHeader />
                        <Footer />
                    </div>
                }
                {this.props.user?.user_role === 1 &&
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

export default ADMINOrders