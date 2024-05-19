import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Modal from '../components/Modal';

export class LoginPage extends Component {

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
          <h1 className='AutorizationTitle'>Авторизация</h1>

          <p className='PageCardText'>Электронная почта</p>
          <input id='reg_email' type='email' maxlength="30" className='AutorizationTextArea'></input>

          <p className='PageCardText'>Пароль</p>
          <div className='AutorizationPasswordFieldContainer'>
            <input pattern="^[a-zA-Z0-9]{8,50}$" id='reg_password' type={this.state.PasswordShowed ? 'text' : 'password'} maxlength="120" className='AutorizationPasswordField' required={true}></input>
            <div className="ShowPasswordButton" onClick={() => (this.setState({ PasswordShowed: !this.state.PasswordShowed }))}>{this.state.PasswordShowed ? <i class="fi fi-rr-eye"></i> : <i class="fi fi-rr-eye-crossed"></i>}</div>
          </div>

          <CSSTransition in={this.state.RegistrationCompleted} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#0A5954" }} className='PageCardText'>Регистрация прошла успешно</p></CSSTransition>
          <CSSTransition in={this.state.RegistrationShowError} timeout={1000} classNames='smallalert' unmountOnExit><p style={{ color: "#E04E20" }} className='PageCardText'>{this.state.ErrorText}</p></CSSTransition>

          <div onClick={() => this.openModalWindow()} className='RegistrationButton'>Войти</div>
          <Link to="/registration"  style={{ width: "100%", textAlign: "center", marginTop: "10px" }}><p>Еще нет аккаунта? <u>Создать</u></p></Link>
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
}

export default LoginPage