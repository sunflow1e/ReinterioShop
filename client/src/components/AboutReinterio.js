import React, { Component } from 'react'

export class AboutReinterio extends Component {
  render() {
    return (
        <div class = "AboutReinterio">
            <div class = "AboutReinterioText">
                <h2 class = "AboutReinterioTitle">Это Reinterio</h2>
                <p> Мы - команда профессионалов, которая знает все о мебели и дизайне интерьера. Наша миссия - помочь вам создать уютное и стильное пространство, где вы будете чувствовать себя комфортно и уверенно.
                    <br /><br />
                    В нашем интернет-магазине вы найдете широкий ассортимент мебели для любого помещения: гостиной, спальни, кухни, детской комнаты и даже офиса. Мы предлагаем только качественную мебель от проверенных производителей, которая прослужит вам долгие годы.
                    <br /><br />
                    Не упустите возможность создать уютное пространство с помощью мебели от Reinterio!
                </p>
            </div>

            <img src="/img/AboutReinterio.png" class = "AboutReinterioImage"></img>
        </div>
    )
  }
}

export default AboutReinterio