import React, { Component } from 'react'

export class DeliveryButton extends Component {
    render() {

        let MaxWeight = 0;
        MaxWeight = this.props.delivery.delivery_minprice / this.props.delivery.delivery_weightprice
        MaxWeight = Math.round(MaxWeight)

        let CurrentDate = new Date();
        CurrentDate.setDate(CurrentDate.getDate() + this.props.delivery.delivery_days);

        var DeliveryDate = CurrentDate.toLocaleString('ru', {
            month: 'long',
            day: 'numeric'
        });

        return (
            <>
                {this.props.currdelivery === this.props.delivery.delivery_id &&
                    <div className='CurrentDeliveryButton'>
                        <div className='DeliveryPriceContainer'>
                            <b>{this.props.delivery.delivery_name}</b>
                            <i
                                style={{ backgroundColor: '#0A5954', color: "white", borderRadius: "32px", padding: "5px 5px 2px", fontSize: "14px" }}
                                class='fi fi-rr-check'
                            ></i>
                        </div>
                        <div className='DeliveryPriceContainer'>
                            {this.props.FullWeight < MaxWeight &&
                                <div className='DeliveryPrice'>{this.props.delivery.delivery_minprice + " ₽"}</div>
                            }
                            {this.props.FullWeight >= MaxWeight &&
                                <div className='DeliveryPrice'>{Intl.NumberFormat().format(this.props.delivery.delivery_weightprice * this.props.FullWeight) + " ₽ за " +this.props.FullWeight.toFixed(2) + " кг."}</div>
                            }
                            <div className='DeliveryPrice'>{"Доставим " + DeliveryDate}</div>
                        </div>
                    </div>
                }

                {this.props.currdelivery !== this.props.delivery.delivery_id &&
                    <div className='DeliveryButton' onClick={() => this.props.onChangeSelected(this.props.delivery.delivery_id)}>
                        <div className='DeliveryPriceContainer'>
                            <p>{this.props.delivery.delivery_name}</p>
                        </div>
                        <div className='DeliveryPriceContainer'>
                            {this.props.FullWeight < MaxWeight &&
                                <div className='DeliveryPrice'>{this.props.delivery.delivery_minprice + " ₽"}</div>
                            }
                            {this.props.FullWeight >= MaxWeight &&
                                <div className='DeliveryPrice'>{Intl.NumberFormat().format(this.props.delivery.delivery_weightprice * this.props.FullWeight) + " ₽ за " + this.props.FullWeight.toFixed(2) + " кг."}</div>
                            }
                            <div className='DeliveryPrice'>{"Доставим " + DeliveryDate}</div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default DeliveryButton