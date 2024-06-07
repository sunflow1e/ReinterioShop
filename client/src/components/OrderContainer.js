import React, { Component } from 'react'
import OrderCard from './OrderCard'
import axios from "axios";

export class OrderContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            order_products: [],
            statuses: [],
            current_status: this.props.order.status_name
        }
    }

    componentDidMount() {
        this.getProducts();
        this.getStatuses();
    }

    getProducts() {
        const qs = require('qs')
        let data = qs.stringify({})

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:
                `${process.env.REACT_APP_API_URL}/order/all/products/` +
                Number.parseInt(this.props.order.order_id),
            headers: {},
            data: data,
        }

        axios
            .request(config)
            .then(response => {
                this.setState({ order_products: response.data })
            })
            .catch(error => {
                console.log(error)
            })
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
            <div className='OrderContainer'>
                <div class='OrderJustifyContainer'>
                    <p className='PageCardTitle'>{'Заказ №' + this.props.order.order_id}</p>
                    {!this.props.admin && <div onClick={() => this.ordering()} className='CardSmallButton'>Повторить заказ</div>}
                </div>
                <div className='OrderInfo'>
                    <div className='GrayBackground'>
                        <p className='PageCardTitle'>Об оплате</p>

                        <div class='OrderJustifyContainer'>
                            <p class='PageCardText'>Стоимость доставки: </p>
                            <p class='PageCardText'>
                                {new Intl.NumberFormat().format(this.props.order.order_delivery_price) + ' ₽'}
                            </p>
                        </div>

                        <div class='OrderJustifyContainer'>
                            <p class='PageCardText'>Итоговая стоимость: </p>
                            <p class='PageCardText'>
                                {new Intl.NumberFormat().format(this.props.order.order_price) + ' ₽'}
                            </p>
                        </div>
                    </div>

                    <div className='GrayBackground'>
                        <p className='PageCardTitle'>{this.props.order.delivery_name}</p>

                        <div class='OrderJustifyContainer'>
                            <p class='PageCardText'>Ожидаемая дата:</p>
                            <p class='PageCardText'>
                                {new Date(this.props.order.order_delivery_date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className='PageCardText'><i className='fi fi-rr-home-location'></i><p>{this.props.order.order_address}</p></div>
                    </div>

                    <div className='GrayBackground'>
                        <p className='PageCardTitle'>Статус заказа</p>
                        {!this.props.admin &&
                            <p class='PageCardText'>
                                {this.props.order.status_name}
                            </p>
                        }
                        {this.props.admin &&
                            <select onChange={e => this.changeStatus(e.target.value)} className='DropDown' id="Select">
                                {this.state.current_status === this.props.order.status_name &&
                                    <option value={this.props.order.status_name} >{this.props.order.status_name}</option>
                                }
                                {this.state.statuses[0] && this.state.current_status !== this.state.statuses[0].status_name && <option value={this.state.statuses[0].status_id}>{this.state.statuses[0].status_name}</option>}
                                {this.state.statuses[1] && this.state.current_status !== this.state.statuses[1].status_name && <option value={this.state.statuses[1].status_id}>{this.state.statuses[1].status_name}</option>}
                                {this.state.statuses[2] && this.state.current_status !== this.state.statuses[2].status_name && <option value={this.state.statuses[2].status_id}>{this.state.statuses[2].status_name}</option>}
                                {this.state.statuses[3] && this.state.current_status !== this.state.statuses[3].status_name && <option value={this.state.statuses[3].status_id}>{this.state.statuses[3].status_name}</option>}
                                {this.state.statuses[4] && this.state.current_status !== this.state.statuses[4].status_name && <option value={this.state.statuses[4].status_id}>{this.state.statuses[4].status_name}</option>}
                                {this.state.statuses[5] && this.state.current_status !== this.state.statuses[5].status_name && <option value={this.state.statuses[5].status_id}>{this.state.statuses[5].status_name}</option>}
                                {this.state.statuses[6] && this.state.current_status !== this.state.statuses[6].status_name && <option value={this.state.statuses[6].status_id}>{this.state.statuses[6].status_name}</option>}
                                {this.state.statuses[7] && this.state.current_status !== this.state.statuses[7].status_name && <option value={this.state.statuses[7].status_id}>{this.state.statuses[7].status_name}</option>}
                                {this.state.statuses[8] && this.state.current_status !== this.state.statuses[8].status_name && <option value={this.state.statuses[8].status_id}>{this.state.statuses[8].status_name}</option>}
                                {this.state.statuses[9] && this.state.current_status !== this.state.statuses[9].status_name && <option value={this.state.statuses[9].status_id}>{this.state.statuses[9].status_name}</option>}
                                {this.state.statuses[10] && this.state.current_status !== this.state.statuses[10].status_name && <option value={this.state.statuses[10].status_id}>{this.state.statuses[10].status_name}</option>}
                                {this.state.statuses[11] && this.state.current_status !== this.state.statuses[11].status_name && <option value={this.state.statuses[11].status_id}>{this.state.statuses[11].status_name}</option>}
                                {this.state.statuses[12] && this.state.current_status !== this.state.statuses[12].status_name && <option value={this.state.statuses[12].status_id}>{this.state.statuses[12].status_name}</option>}
                                {this.state.statuses[13] && this.state.current_status !== this.state.statuses[13].status_name && <option value={this.state.statuses[13].status_id}>{this.state.statuses[13].status_name}</option>}
                                {this.state.statuses[14] && this.state.current_status !== this.state.statuses[14].status_name && <option value={this.state.statuses[14].status_id}>{this.state.statuses[14].status_name}</option>}
                                {this.state.statuses[15] && this.state.current_status !== this.state.statuses[15].status_name && <option value={this.state.statuses[15].status_id}>{this.state.statuses[15].status_name}</option>}
                                {this.state.statuses[16] && this.state.current_status !== this.state.statuses[16].status_name && <option value={this.state.statuses[16].status_id}>{this.state.statuses[16].status_name}</option>}
                            </select>
                        }
                    </div>
                </div>


                <p className='PageCardTitle'>Состав заказа</p>
                <div className='OrderProdContainer'>
                    {this.state.order_products?.map(product => (
                        <OrderCard
                            key={product.productd_id}
                            user_id={localStorage.getItem('userId')}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        )
    }

    ordering() {
        const products = this.state.order_products.filter(prd => prd.productd_onstock > 1)
        localStorage.setItem('OrdertingProducts', JSON.stringify(products))
        window.location.href = '/ordering'
    }

    changeStatus(selectObject) {

        this.setState({ current_status: 'helpmepls' })

        const qs = require('qs');
        let data = qs.stringify({
            'order': this.props.order.order_id,
            'status': selectObject
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
}

export default OrderContainer