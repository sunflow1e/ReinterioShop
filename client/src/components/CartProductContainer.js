import React, { Component } from 'react'
import CartCard from './CartCard'

export class CartProductContainer extends Component {
  render() {
    return (
        <div class = "CartCardsContainer">    
            {this.props.cartproducts?.map(CurrentCartProduct => (
            <CartCard key = {CurrentCartProduct.productd_id} onDeleteProduct={this.props.onDeleteProduct} onSelectedChange={this.props.onSelectedChange} cartproduct = {CurrentCartProduct} onDelete={this.props.onDelete} onCountChange={this.props.onCountChange}/>
        ))}
        </div>
    )
  }
}

export default CartProductContainer