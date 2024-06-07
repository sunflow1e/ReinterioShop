import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductsContainer from "../components/ProductsContainer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import OrderContainer from '../components/OrderContainer';
import EDIT_STATUS from '../components/EDIT_STATUS';


export class ADMIN_EDIT_status extends Component {
    constructor(props) {
        super(props)

        this.state = {
            statuses: [],
            orders: [],
            IsModalShown: false,
        }
        this.deleteStatus = this.deleteStatus.bind(this)
    }

    componentDidMount() {
        this.getStatuses();
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

    getStatuses() {
        const qs = require('qs')
        let data = qs.stringify({})

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:
                `${process.env.REACT_APP_API_URL}/status`,
            headers: {},
            data: data,
        }

        axios
            .request(config)
            .then(response => {
                this.setState({ statuses: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <>
                {this.props.user?.user_role === 1 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Управление статусами</h1>
                            </div>

                            <div class="PageTitleLine"></div>
                        </div>
                        <div>

                        </div>
                        <div className='ReviewCard'>
                            {this.state.statuses?.map(status => (
                                <EDIT_STATUS
                                    key={status.status_id}
                                    user_id={localStorage.getItem('userId')}
                                    status={status}
                                    deleteStatus = {this.deleteStatus}
                                />
                            ))}

                            <div onClick={() => this.addStatus()} style={{ width: "300px" }} className='ModalMainButtonGreen'>Добавить статус</div>
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

    addStatus() {
        let objectToAdd = [{ status_id: 999, status_name: '', status_finish: false }];
        let newArray = this.state.statuses;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ statuses: newArray })
    }

    deleteStatus(id) {
        let origin = this.state.statuses
        origin = origin.filter(a => a.status_id !== id)
        this.setState({ statuses: origin })

        this.updateOrders(id)
        this.deleteFromBD(id)
    }

    updateOrders(id){
        this.state.orders.filter(el => el.order_status === id).map(el => this.updateOrderStatus(el.order_id))
    }

    updateOrderStatus(id){
        const qs = require('qs');
        let data = qs.stringify({
            'order': id,
            'status': 0
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/order/status`,
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
            url: `${process.env.REACT_APP_API_URL}/status/` + id,
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

export default ADMIN_EDIT_status