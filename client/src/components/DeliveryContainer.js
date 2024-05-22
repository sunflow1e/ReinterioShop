import React, { Component } from 'react'
import DeliveryButton from './DeliveryButton'

export class DeliveryContainer extends Component {
    render() {
        return (
            <div class="DeliveryContainer">
                {this.props.delivery?.map(CurrentDelivery => (
                    <DeliveryButton onChangeSelected={this.props.onChangeSelected} FullWeight = {this.props.FullWeight} currdelivery={this.props.currentdelivery} key={CurrentDelivery.delivery_id} delivery={CurrentDelivery} />
                ))}
            </div>
        )
    }
}

export default DeliveryContainer