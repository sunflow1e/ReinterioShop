import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Modal from '../components/Modal';

export class RegistrationPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      IsModalShown: false,
      RegistrationShowError: false,
      RegistrationCompleted: false,
      ErrorText: "Ошибка",
    };
    this.closeModalWindow = this.closeModalWindow.bind(this);
    this.openModalWindow = this.openModalWindow.bind(this);
  }

  render() {
    return (
      <div className='AutorizationPage'>
        <div className='AutorizationImage'></div>
        <div className='AutorizationContainer'>
          <h1 className='AutorizationTitle'>Регистрация в Reinterio</h1>
          <p className='PageCardText'>Имя</p>
          <input pattern="[А-Яа-я]+" id='reg_name' type='text' maxlength="30" className='AutorizationTextArea' required={true}></input>

          <p className='PageCardText'>Фамилия</p>
          <input pattern="[А-Яа-я]+"  id='reg_surname' type='text' maxlength="30" className='AutorizationTextArea'></input>

          <p className='PageCardText'>Отчество</p>
          <input pattern="[А-Яа-я]+"  id='reg_patronymic' type='text' maxlength="30" className='AutorizationTextArea'></input>

          <p className='PageCardText'>Электронная почта</p>
          <input id='reg_email' type='email' maxlength="30" className='AutorizationTextArea'></input>

          <p className='PageCardText'>Пароль</p>
          <div className='AutorizationPasswordFieldContainer'>
            <input pattern="^[a-zA-Z0-9]{8,50}$" id='reg_password' type={this.state.PasswordShowed ? 'text' : 'password'} maxlength="120" className='AutorizationPasswordField' required={true}></input>
            <div className="ShowPasswordButton" onClick={() => (this.setState({ PasswordShowed: !this.state.PasswordShowed }))}>{this.state.PasswordShowed ? <i class="fi fi-rr-eye"></i> : <i class="fi fi-rr-eye-crossed"></i>}</div>
          </div>

          <p className='PageCardText'>Повтор пароля</p>
          <div className='AutorizationPasswordFieldContainer'>
            <input pattern="^[a-zA-Z0-9]{8,50}$" id='reg_password_check' type={this.state.PasswordShowed ? 'text' : 'password'} maxlength="120" className='AutorizationPasswordField' required={true}></input>
            <div className="ShowPasswordButton" onClick={() => (this.setState({ PasswordShowed: !this.state.PasswordShowed }))}>{this.state.PasswordShowed ? <i class="fi fi-rr-eye"></i> : <i class="fi fi-rr-eye-crossed"></i>}</div>
          </div>

          <CSSTransition in={this.state.RegistrationCompleted} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#0A5954" }} className='PageCardText'>Регистрация прошла успешно</p></CSSTransition>
          <CSSTransition in={this.state.RegistrationShowError} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#E04E20" }} className='PageCardText'>{this.state.ErrorText}</p></CSSTransition>

          <div onClick={() => this.startRegistration()} className='RegistrationButton'>Создать аккаунт</div>
          <Link to="/login" style={{ width: "100%", textAlign: "center", marginTop: "10px" }}><p>Уже есть аккаунт? <u>Войти</u></p></Link>
        </div>
        {this.state.IsModalShown &&
          <Modal closeModalWindow={this.closeModalWindow} ModalTitle={"Подтвердите регистрацию"} ModalText={"Код для подтверждения был отправлен на указанный адрес электронной почты"} />
        }
      </div>
    )
  }

  openModalWindow() {
    this.setState({ IsModalShown: true });
  }

  closeModalWindow() {
    this.setState({ IsModalShown: false });
  }

  startRegistration() {
    this.setState({ RegistrationShowError: false });


    if (this.PasswordCheckValidate() && this.PasswordEqual() && this.CheckEmail() && this.checkProfileInfoValidate()) {
      this.openModalWindow();
    }
    else if (!this.CheckEmail()) {
      this.setState({ ErrorText: "Недействительный адрес электронной почты!" });
      this.setState({ RegistrationShowError: true });
    }
    else if (!this.PasswordCheckValidate()) {
      this.setState({ ErrorText: "Минимальная длинна пароля - 8 символов. Он дожен состоять только из латинских букв и цифр" });
      this.setState({ RegistrationShowError: true });
    }
    else if (!this.PasswordEqual()) {
      this.setState({ ErrorText: "Пароли не совпадают" });
      this.setState({ RegistrationShowError: true });
    }
    else if (!this.checkProfileInfoValidate()) {
      this.setState({ ErrorText: "Поля ФИО должны быть заполненым русскими буквами, без использования символов и цифр" });
      this.setState({ RegistrationShowError: true });
    }
    else {
      this.setState({ ErrorText: "Поля заполнены неверно" });
      this.setState({ RegistrationShowError: true });
    }
  }


  PasswordCheckValidate() {
    var inputpassword = document.getElementById("reg_password");

    if (inputpassword.checkValidity()) {
      return true;
    }
    else {
      return false;
    }
  }

  PasswordEqual() {
    var inputpassword = document.getElementById("reg_password");
    var inputpasswordcheck = document.getElementById("reg_password_check");

    console.log(inputpassword.value);
    console.log(inputpasswordcheck.value);
    console.log(inputpasswordcheck.value === inputpassword.value);

    if (inputpassword.value === inputpasswordcheck.value) {
      return true;
    }
    else {
      return false;
    }
  }

  CheckEmail() {
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = document.getElementById('reg_email').value;
    if (email.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }

  checkProfileInfoValidate() {
    var inputname = document.getElementById("reg_name");
    var inputsutname = document.getElementById("reg_surname");

    if (inputname.checkValidity() && inputsutname.checkValidity()) {
      return true;
    }
    else {
      return false;
    }
  }
}

export default RegistrationPage