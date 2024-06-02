import React, { Component } from 'react'

export class OrderCard extends Component {
    render() {
        return (
            <div className='OrderProductCard'>
                <a href={'/product/' + this.props.product.productd_id}>
                    <div className='OrderImgContainer'>
                        <img
                            class='OrderProductImg'
                            src={'./img/' + this.props.product.image_path}
                            alt=''
                        ></img>
                    </div>
                </a>

                <div className='OrderInfoContainer'>
                    <b>{this.props.product.product_name}</b>
                    <p>{'Цвет: '+ this.props.product.color_name}</p>
                    <p>{this.props.product.orderprod_count + ' шт.'}</p>
                </div>

            </div>
        )
    }
}

export default OrderCard