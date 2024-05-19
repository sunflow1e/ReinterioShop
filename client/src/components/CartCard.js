import React, { Component } from 'react'

export class CartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsAddedToFav: true
    };
  }

  componentDidMount() {
    this.setState({ IsAddedToFav: this.props.cartproduct.product_addedtofavourite })
  }

  render() {
    return (
      <div class="CartCard">
        <a href={"/product/" + this.props.cartproduct.productd_id}>
          <div className='CartCardImg'>
            <img class="PCardImg" src={"./img/" + this.props.cartproduct.image_path} alt=""></img>
          </div></a>
        <div class="CartCardMobileContainer">
          <div class="CartCardInfo">
            <a href={"/product/" + this.props.cartproduct.productd_id}>
              <h class="CartCardName">{this.props.cartproduct.product_name}</h>
            </a>
            <h class="CartCardArticul">{this.props.cartproduct.product_article}</h>
            <h class="CartCardInfoText">{"Цвет: " + this.props.cartproduct.color_name}</h>
            <h class="CartCardInfoText">{"Размер: " + this.props.cartproduct.product_length + " x " + this.props.cartproduct.product_width + " x " + this.props.cartproduct.product_height}</h>
          </div>


          <div class="CartCardPriceCountContainer">
            <div class="CartCardPriceContainer">
              <h class="CartCardPrice">{new Intl.NumberFormat().format(this.props.cartproduct.product_disc_price) + " ₽"}</h>
              {this.props.cartproduct.product_discount !== 0 &&
                <h class="CartCardsPriceBefore">{new Intl.NumberFormat().format(this.props.cartproduct.product_price) + " ₽"}</h>
              }
              {this.props.cartproduct.product_discount !== 0 &&
                <div class="CartCardDiscount"> {"-" + this.props.cartproduct.product_discount + "%"} </div>
              }
            </div>


            <div class="CartCardCount">
              <div onClick={() => {
                this.props.onCountChange(this.props.cartproduct.productd_id, (this.props.cartproduct.cart_count > 1
                  ? this.props.cartproduct.cart_count - 1
                  : 1))
              }}
                class="CartCardCountButton" id="CartCardLess">-</div>

              <div class="CartCardCountText">{new Intl.NumberFormat().format(this.props.cartproduct.cart_count) + " шт."}</div>

              <div onClick={() => {
                this.props.onCountChange(this.props.cartproduct.productd_id, (this.props.cartproduct.cart_count < this.props.cartproduct.productd_onstock
                  ? this.props.cartproduct.cart_count + 1
                  : this.props.cartproduct.cart_count))
              }} class="CartCardCountButton" id="CartCardMore">+</div>
            </div>
          </div>
        </div>


        <div class="CartCardFavouriteSelectedDelete">
          <div class="CartSmallButton"

            onClick={() => (!this.state.IsAddedToFav
              ? this.addToFavourite(this.props.cartproduct)
              : this.deleteFromFavourite(this.props.cartproduct))}>

            {!this.state.IsAddedToFav
              ? <i class="fi fi-rr-heart"></i>
              : <i style={{ color: "#E04E20" }} class="fi fi-sr-heart"></i>}</div>


          <div class="CartSmallButton"
            onClick={() => { this.props.onSelectedChange(this.props.cartproduct.productd_id, !this.props.cartproduct.product_isselected) }}>
            {this.props.cartproduct.product_isselected
              ? <i style={{ color: "#0A5954" }} class="fi fi-sr-checkbox"></i>
              : <i class="fi fi-rr-square"></i>} </div>


          <div class="CartSmallButtonDelete"
            onClick={() => this.props.onDeleteProduct(this.props.cartproduct.productd_id)} id="SmallButtonDelete" ><i class="fi fi-rr-trash" /></div>
        </div>

      </div>
    )
  }

  addToFavourite(prod) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("user", 1);
    urlencoded.append("product", prod.productd_id);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("http://localhost:5000/favourite", requestOptions)
      .then((response) => response.text())
      .then((result) => { this.setState({ IsAddedToFav: true }) })
      .catch((error) => console.error(error));
  }

  deleteFromFavourite(prod) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("user", 1);
    urlencoded.append("product", prod.productd_id);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("http://localhost:5000/favourite", requestOptions)
      .then((response) => response.text())
      .then((result) => { this.setState({ IsAddedToFav: false }) })
      .catch((error) => console.error(error));
  }
}

export default CartCard