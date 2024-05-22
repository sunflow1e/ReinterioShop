import React, { Component } from 'react'

export class BannerFirstType extends Component {
  render() {
    return (
      <a href='/catalogue'>
        <div class="Banner" id="Banner1">
          <div class="BannerContainer">
            <em class="BannerText"><b>Бесплатная доставка</b> при заказе от 7 000 ₽</em>
            <div class="MainButton">Каталог</div>
          </div>
        </div>
      </a>
    )
  }
}

export default BannerFirstType