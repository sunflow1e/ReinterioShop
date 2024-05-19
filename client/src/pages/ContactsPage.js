import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

export class ContactsPage extends Component {
  render() {
    return (
      <div class="Content">
        <div class="PageTitle">
          <div class="PageTitleTextContainer">
            <h1 class="PageTitleText">Контакты</h1>
          </div>

          <div class="PageTitleLine" />
        </div>

        <p style={{ lineHeight: "150%", fontSize: "20px" }}><b>Телефон:</b> +7 941 432 34 19</p>
        <br></br>
        <p style={{ lineHeight: "150%", fontSize: "20px" }}><b>Электронная почта:</b> reinterio.shop@mail.ru</p>
        <br></br>
        <p style={{ lineHeight: "150%", fontSize: "20px" }}><b>Режим работы:</b> с 09:00 до 22:00, ежедневно</p>
        <br></br>
        <Header />
        <Footer />
      </div>
    )
  }
}

export default ContactsPage