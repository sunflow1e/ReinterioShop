import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ADMINHeader from '../components/ADMINHeader';

export class DelieveryPage extends Component {
  render() {
    return (
      <div class="Content">
        <div class="PageTitle">
          <div class="PageTitleTextContainer">
            <h1 class="PageTitleText">Доставка</h1>
          </div>

          <div class="PageTitleLine" />
        </div>

        <p style={{ lineHeight: "150%", fontSize: "20px" }}>Reinterio стремится предоставить своим покупателям мебель по самой выгодной цене на рынке. Именно поэтому мы не вкладываем в стоимость товара лишние логистические расходы и доставляем товар до покупателя напрямую от фабрики или поставщика. В таком случае ваш заказ может быть разбит на разные отправления. Это позволяет снизить цену для покупателя, как на сам товар, так и на его доставку
        </p>
        <br></br>
        <p style={{ lineHeight: "150%", fontSize: "20px" }}><b>Стоимость и условия доставки</b><br />
          Cтоимость доставки по городу рассчитывается относительно категорий выбранных товаров.<br />
          <br />
          Доставка мебели осуществляется до подъезда или дома. Услуги подъема и проноса мебели оплачиваются дополнительно.<br />
          Обращаем ваше внимание на то, что у нас нет выделенных доставок ко времени, так как маршрут водителя формируется в день доставки с целью сделать его наиболее эффективным, следовательно более выгодным для вас в экономическом плане. Но это не значит, что необходимо ждать доставку весь день - курьер позвонит вам заранее и сориентирует по времени доставки.</p>
        {this.props.user?.user_role === 2 ?
          <ADMINHeader /> :
          <Header />
        }
        <Footer />
      </div>
    )
  }
}

export default DelieveryPage