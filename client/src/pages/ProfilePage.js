import React, { Component, userState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartProductContainer from '../components/CartProductContainer';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { IMaskInput } from 'react-imask';
import 'react-phone-input-2/lib/style.css'

export class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      SettingsShow: false,

      AddressChanged: false,
      AddressSaved: false,
      AddressShowError: false,

      ProfileSaved: false,
      ProfileChanged: false,
      ProfileErrorText: "Заполните все поля!",
      ProfileShowError: false,

      PasswordChanged: false,
      PasswordSaved: false,
      PasswordShowed: false,
      PasswordErrorText: "Пароль слишком корткий",
      PasswordShowError: false,
    };
  }

  render() {
    return (

      <div className='Content'>
        <div className='PageTitleContainer'>

          <div className='PageTitle'>
            <div className='PageTitleTextContainer'>
              <h1 className='PageTitleText'>{"Здравствуйте, " + this.props.user.user_name + "!"}</h1>
            </div>
            <div className='PageTitleLine' />
          </div>
        </div>
        <div className='PageCardsContainer'>
          <div style={{ zIndex: "9" }} className='PageCards'>
            <div className='SidePageCard'>
              <div className='PageCardButtonsWrapper'>

                <div className='PageCardButtonSecondType'>
                  <i class="fi fi-rr-shopping-bag"></i>
                  <p>Мои заказы</p>
                </div>

                <div className='PageCardButtonSecondType'>
                  <i class="fi fi-rr-star"></i>
                  <p>Мои отзывы</p>
                </div>

                <a href='#Settings'>
                  <div onClick={() => this.ShowSettings()} className='PageCardButtonSecondType'>
                    <i class="fi fi-rr-settings"></i>
                    <p>{this.state.SettingsShow ? "Закрыть настройки" : "Настройки"}</p>
                  </div></a>
              </div>


              <div className='PageCardButtonsWrapper'>
                <div className='PageCardButtonSecondType'>
                  <i class="fi fi-rr-document-signed"></i>
                  <p>Справка</p>
                </div>

                <div className='PageCardButtonSecondType'>
                  <i class="fi fi-rr-search-alt"></i>
                  <p>Помощь</p>
                </div>
              </div>

              <div className='PageCardButtonsWrapper'>
                <div className='PageCardButtonSecondType'>
                  <i style={{ color: "#E04E20" }} class="fi fi-rr-sign-out-alt"></i>
                  <p style={{ color: "#E04E20" }}>Выйти из аккаунта</p>
                </div>
              </div>
            </div>

            <div className='PageCard'>
              <p className='PageCardTitle'>Доставки</p>
            </div>

            <div className='SidePageCard'>
              <p className='PageCardTitle'>Ожидают отзыва</p>
            </div>

          </div>

          {this.state.SettingsShow &&
            <div id="Settings"></div>
          }
          <CSSTransition in={this.state.SettingsShow} timeout={1000} classNames='alert' unmountOnExit>
            <div className='PageCards'>
              <div style={{ zIndex: "1" }} id="SettingsPanel" className='SidePageCard'>

                <div className='PageCardTitleContainer'>
                  <p className='PageCardTitle'>Личные данные</p>
                  {this.state.ProfileChanged &&
                    <div className='CardSmallButton' onClick={() => this.updateProfileInfo()}>Сохранить</div>
                  }
                </div>
                <p className='PageCardText'>Имя</p>
                <input pattern="[А-Яа-я]+" onChange={() => (this.UpdateProfileInfo())} id='profile_name' type='text' maxlength="30" className='MainTextArea' required={true} defaultValue={this.props.user.user_name}></input>

                <p className='PageCardText'>Фамилия</p>
                <input pattern="[А-Яа-я]+" onChange={() => (this.UpdateProfileInfo())} id='profile_surname' type='text' maxlength="30" className='MainTextArea' defaultValue={this.props.user.user_surname}></input>

                <p className='PageCardText'>Отчество</p>
                <input pattern="[А-Яа-я]+" onChange={() => (this.UpdateProfileInfo())} id='profile_patronymic' type='text' maxlength="30" className='MainTextArea' defaultValue={this.props.user.user_patronymic}></input>

                <p className='PageCardText'>Электронная почта</p>
                <input onChange={() => (this.UpdateProfileInfo())} id='profile_email' type='email' maxlength="30" className='MainTextArea' defaultValue={this.props.user.user_email}></input>

                <p className='PageCardText'>Телефон</p>
                <input id='profile_phone' type='tel' maxlength="30" className='MainTextArea' defaultValue={this.props.user.user_phone}></input>

                <CSSTransition in={this.state.ProfileSaved} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#0A5954" }} className='PageCardText'>Успешно сохранено!</p></CSSTransition>
                <CSSTransition in={this.state.ProfileShowError} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#E04E20" }} className='PageCardText'>{this.state.ProfileErrorText}</p></CSSTransition>
              </div>

              <div className='PageCard'>
                <div className='PageCardTitleContainer'>
                  <p className='PageCardTitle'>Адрес доставки</p>
                  {this.state.AddressChanged &&
                    <div className='CardSmallButton' onClick={() => this.updateProfileAddress()}>Сохранить</div>
                  }
                </div>
                <p style={{ color: '#B4A39A' }} className='PageCardText'>{this.props.user.user_address !== null ? 'Последний указанный адрес доставки' : 'Вы еще не указали адрес доставки'}</p>
                <input pattern="[А-Яа-я]+" onChange={() => (this.UpdateProfileAddress())} id='profile_address' type='text' maxlength="70" className='MainTextArea' defaultValue={this.props.user.user_address} placeholder='Например: Москва, ул. Сенная 28, кв 15'></input>
                <CSSTransition in={this.state.AddressSaved} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#0A5954" }} className='PageCardText'>Успешно сохранено!</p></CSSTransition>
                <CSSTransition in={this.state.AddressShowError} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#E04E20" }} className='PageCardText'>Заполните поле адреса!</p></CSSTransition>
              </div>

              <div className='SidePageCard'>
                <div className='PageCardTitleContainer'>
                  <p className='PageCardTitle'>Безопасность</p>
                  <div style={{ display: "Flex", flexDirection: "row", gap: "10px" }}>
                    {this.state.PasswordChanged &&
                      <div className='CardSmallButtonSecondary' onClick={() => (this.setState({ PasswordChanged: !this.state.PasswordChanged }), this.setState({ PasswordShowed: false }), this.setState({ PasswordShowError: false }), this.setState({ PasswordSaved: false }))}><i style={{fontSize: "12px"}}class="fi fi-rr-cross"></i></div>
                    }
                    <div className={this.state.PasswordChanged ? 'CardSmallButton' : 'CardSmallButtonSecondary'} onClick={() => !this.state.PasswordChanged 
                      ? (this.setState({ PasswordChanged: !this.state.PasswordChanged }), this.setState({ PasswordShowed: false }), this.setState({ PasswordShowError: false }), this.setState({ PasswordSaved: false })) 
                      : (this.UpdateProfilePassword())}>
                      {this.state.PasswordChanged ? 'Сохранить' : 'Сменить пароль'}</div>
                  </div>
                </div>
                <p style={{ color: '#B4A39A' }} className='PageCardText'>{this.state.PasswordChanged ? 'Установка нового пароля' : 'Установлен надежный пароль'}</p>
                <div className='PasswordFieldContainer'>
                  {!this.state.PasswordChanged &&
                    <input type="password" readOnly="true" className='PasswordField' defaultValue={"**********"}></input>
                  }

                  {this.state.PasswordChanged &&
                    <input pattern="^[a-zA-Z0-9]{8,50}$" id='profile_password' type={this.state.PasswordShowed ? 'text' : 'password'} maxlength="120" className='PasswordField' required={true}></input>
                  }

                  {this.state.PasswordChanged &&
                    <div className="ShowPasswordButton" onClick={() => (this.setState({ PasswordShowed: !this.state.PasswordShowed }))}>{this.state.PasswordShowed ? <i class="fi fi-rr-eye"></i> : <i class="fi fi-rr-eye-crossed"></i>}</div>
                  }
                </div>
                <CSSTransition in={this.state.PasswordSaved} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#0A5954" }} className='PageCardText'>Успешно сохранено!</p></CSSTransition>
                <CSSTransition in={this.state.PasswordChanged} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: '#B4A39A' }} className='PageCardText'>Подтверждение пароля</p></CSSTransition>
                <CSSTransition in={this.state.PasswordChanged} timeout={1000} classNames='smallalert' unmountOnExit>
                  <div className='PasswordFieldContainer'>
                    <input pattern="^[a-zA-Z0-9]{8,50}$" id='profile_password_check' type={this.state.PasswordShowed ? 'text' : 'password'} maxlength="120" className='PasswordField' required={true}></input>
                    <div className="ShowPasswordButton" onClick={() => (this.setState({ PasswordShowed: !this.state.PasswordShowed }))}>{this.state.PasswordShowed ? <i class="fi fi-rr-eye"></i> : <i class="fi fi-rr-eye-crossed"></i>}</div>
                  </div>
                </CSSTransition>
                <CSSTransition in={this.state.PasswordShowError} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#E04E20" }} className='PageCardText'>{this.state.PasswordErrorText}</p></CSSTransition>
              </div>

            </div>
          </CSSTransition>
        </div>
        <Header />
        <Footer />
      </div>

    )
  }

  UpdateProfilePassword() {
    if (!this.PasswordEqual()){
      this.ShowPasswordError("Пароли не совпадают");
    }
    else if (this.PasswordCheckValidate() && this.PasswordEqual()) {
      this.setState({ PasswordSaved: true });
      this.setState({ PasswordChanged: !this.state.PasswordChanged });
      this.setState({ PasswordShowed: false });
      this.setState({ PasswordShowError: false });

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("password", document.getElementById('profile_password').value);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      };

      fetch("http://localhost:5000/user/updatepassword/" + this.props.user.user_id, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
    else {
      this.ShowPasswordError("Минимальная длинна пароля - 8 символов. Он дожен состоять только из латинских букв и цифр");
    }
  }

  ShowPasswordError(ErrorText) {
    this.setState({ PasswordShowError: true });
    this.setState({ PasswordErrorText: ErrorText });
  }

  PasswordCheckValidate() {
    var inputpassword = document.getElementById("profile_password");

    if (inputpassword.checkValidity()) {
      return true;
    }
    else {
      return false;
    }
  }

  PasswordEqual(){
    var inputpassword = document.getElementById("profile_password");
    var inputpasswordcheck = document.getElementById("profile_password_check");

    if (inputpassword.value === inputpasswordcheck.value) {
      return true;
    }
    else {
      return false;
    }
  }


  UpdateProfileAddress() {
    this.setState({ AddressSaved: false });
    this.setState({ AddressChanged: true });
    this.setState({ AddressShowError: false });
  }

  updateProfileAddress() {
    if (document.getElementById('profile_address').value !== '') {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("address", document.getElementById('profile_address').value);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      };

      fetch("http://localhost:5000/user/updateaddress/" + this.props.user.user_id, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

      this.setState({ AddressSaved: true });
      this.setState({ AddressChanged: false });
    }
    else {
      this.setState({ AddressShowError: true });
    }
  }

  ShowSettings() {
    this.setState({ SettingsShow: !this.state.SettingsShow });
    if (!this.state.SettingsShow) {
      this.setState({ ProfileChanged: false });
      this.setState({ ProfileSaved: false });
      this.setState({ ProfileShowError: false });

      this.setState({ AddressChanged: false });
      this.setState({ AddressSavedSaved: false });
      this.setState({ AddressShowErrorError: false });

      this.setState({ PasswordChanged: false });
      this.setState({ PasswordSaved: false });
      this.setState({ PasswordShowError: false });
      this.setState({ PasswordShowed: false });
    }
  }

  ShowProfileError(ErrorText) {
    this.setState({ ProfileShowError: true });
    this.setState({ ProfileErrorText: ErrorText });
  }

  UpdateProfileInfo() {
    this.setState({ ProfileShowError: false });
    this.setState({ ProfileSaved: false });
    this.setState({ ProfileChanged: true });
  }

  CheckEmail() {
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = document.getElementById('profile_email').value;
    if (email.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }

  checkProfileInfoValidate() {
    var inputname = document.getElementById("profile_name");
    var inputsutname = document.getElementById("profile_surname");
    var inputpatronymic = document.getElementById("profile_patronymic");

    if (inputname.checkValidity() && inputsutname.checkValidity() && inputpatronymic.checkValidity()) {
      return true;
    }
    else {
      return false;
    }
  }

  updateProfileInfo() {
    this.CheckEmail();
    if (this.CheckEmail() && this.checkProfileInfoValidate()) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("name", document.getElementById('profile_name').value);
      urlencoded.append("surname", document.getElementById('profile_surname').value);
      urlencoded.append("patronymic", document.getElementById('profile_patronymic').value);
      urlencoded.append("email", document.getElementById('profile_email').value);
      urlencoded.append("phone", "");
      console.log(this.state.UserPhone);


      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      };

      fetch("http://localhost:5000/user/updateprofile/" + this.props.user.user_id, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

      this.setState({ ProfileSaved: true });
      this.setState({ ProfileChanged: false });
    }
    else if (!this.CheckEmail()) {
      this.ShowProfileError("Недействительный адрес электронной почты!");
    }
    else if (!this.checkProfileInfoValidate()) {
      this.ShowProfileError("Поля ФИО должны быть заполненым русскими буквами, без использования символов и цифр");
    }
    else {
      this.ShowProfileError("Поля заполнены неверно!")
    }
  }
}

export default ProfilePage