import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Modal from '../components/Modal'

export class LoginPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			IsModalShown: false,
			RegistrationShowError: false,
			RegistrationCompleted: false,
			ErrorText: 'Ошибка',
			email: '',
			password: '',
		}
		this.closeModalWindow = this.closeModalWindow.bind(this)
		this.openModalWindow = this.openModalWindow.bind(this)
	}

	login() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			}),
		}
		fetch('http://127.0.0.1:5000/user-auth/login', requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log(!result.error)
				if (!result.error) {
					localStorage.setItem('userId', result)
					window.location.href = '/'
				}
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		return (
			<div className='AutorizationPage'>
				<div className='AutorizationImage'></div>
				<div className='AutorizationContainer'>
					<h1 className='AutorizationTitle'>Авторизация</h1>

					<p className='PageCardText'>Электронная почта</p>
					<input
						id='reg_email'
						type='email'
						maxLength='30'
						className='AutorizationTextArea'
						onChange={e => this.setState({ email: e.target.value })}
					></input>

					<p className='PageCardText'>Пароль</p>
					<div className='AutorizationPasswordFieldContainer'>
						<input
							pattern='^[a-zA-Z0-9]{8,50}$'
							id='reg_password'
							type={this.state.PasswordShowed ? 'text' : 'password'}
							maxLength='120'
							className='AutorizationPasswordField'
							required={true}
							onChange={e => this.setState({ password: e.target.value })}
						></input>
						<div
							className='ShowPasswordButton'
							onClick={() =>
								this.setState({ PasswordShowed: !this.state.PasswordShowed })
							}
						>
							{this.state.PasswordShowed ? (
								<i class='fi fi-rr-eye'></i>
							) : (
								<i class='fi fi-rr-eye-crossed'></i>
							)}
						</div>
					</div>

					<CSSTransition
						in={this.state.RegistrationCompleted}
						timeout={1000}
						classNames='smallalert'
						unmountOnExit
					>
						<p style={{ color: '#0A5954' }} className='PageCardText'>
							Регистрация прошла успешно
						</p>
					</CSSTransition>
					<CSSTransition
						in={this.state.RegistrationShowError}
						timeout={1000}
						classNames='smallalert'
						unmountOnExit
					>
						<p style={{ color: '#E04E20' }} className='PageCardText'>
							{this.state.ErrorText}
						</p>
					</CSSTransition>

					<div onClick={() => this.login()} className='RegistrationButton'>
						Войти
					</div>
					<Link
						to='/registration'
						style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
					>
						<p>
							Еще нет аккаунта? <u>Создать</u>
						</p>
					</Link>
				</div>
				{this.state.IsModalShown && (
					<Modal
						closeModalWindow={this.closeModalWindow}
						ModalTitle={'Подтвердите регистрацию'}
						ModalText={
							'Код для подтверждения был отправлен на указанный адрес электронной почты'
						}
					/>
				)}
			</div>
		)
	}

	openModalWindow() {
		this.setState({ IsModalShown: true })
	}

	closeModalWindow() {
		this.setState({ IsModalShown: false })
	}
}

export default LoginPage
