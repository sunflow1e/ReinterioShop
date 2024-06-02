import React, { Component } from 'react'
import OrderCard from './OrderCard'
import axios from "axios";

export class OrderContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            order_products: [],
        }
    }

    componentDidMount() {
        this.getProducts();
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

    render() {
        return (
            <div className='OrderContainer'>
                <div class='OrderJustifyContainer'>
                    <p className='PageCardTitle'>{'Заказ №' + this.props.order.order_id}</p>
                    <div onClick={() => this.ordering()} className='CardSmallButton'>Повторить заказ</div>
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
                        <p class='PageCardText'>
                            {this.props.order.status_name}
                        </p>
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
}

export default OrderContainer