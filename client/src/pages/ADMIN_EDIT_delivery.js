import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import EDIT_DELIVERY from '../components/EDIT_DELIVERY';


export class ADMIN_EDIT_delivery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deliveries: [],
            orders: [],
            IsModalShown: false,
        }
        this.deleteDelivery = this.deleteDelivery.bind(this)
    }

    componentDidMount() {
        this.getDeliveries();
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

    getDeliveries() {
        const qs = require('qs')
        let data = qs.stringify({})

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:
                `${process.env.REACT_APP_API_URL}/order/delivery`,
            headers: {},
            data: data,
        }

        axios
            .request(config)
            .then(response => {
                this.setState({ deliveries: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <>
                {this.props.user?.user_role === 2 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Управление доставками</h1>
                            </div>

                            <div class="PageTitleLine"></div>
                        </div>
                        <div>

                        </div>
                        <div className='ReviewCard'>
                            {this.state.deliveries?.map(delivery => (
                                <EDIT_DELIVERY
                                    key={delivery.delivery_id}
                                    user_id={localStorage.getItem('userId')}
                                    delivery={delivery}
                                    deleteDelivery = {this.deleteDelivery}
                                />
                            ))}

                            <div onClick={() => this.addDelivery()} style={{ width: "300px" }} className='ModalMainButtonGreen'>Добавить доставку</div>
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

    addDelivery() {
        let objectToAdd = [{ delivery_id: 999, delivery_name: '', delivery_minprice: 0, delivery_weightprice: 0, delivery_days: 0 }];
        let newArray = this.state.deliveries;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ deliveries: newArray })
    }

    deleteDelivery(id) {
        let origin = this.state.deliveries
        origin = origin.filter(a => a.delivery_id !== id)
        this.setState({ deliveries: origin })


        this.updateOrders(id)
        setTimeout(this.deleteFromBD(id), 2000)
    }

    updateOrders(id){
        this.state.orders.filter(el => el.order_delivery === id).map(el => this.updateOrderDelivery(el.order_id))
    }

    updateOrderDelivery(id){

        const qs = require('qs');
        let data = qs.stringify({
            'delivery': 0,
            'order': id
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/order/delivery`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteFromBD(id) {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/delivery/` + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }
}

export default ADMIN_EDIT_delivery