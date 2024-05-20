import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Modal from '../components/Modal'

export class RegistrationPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			IsModalShown: false,
			RegistrationShowError: false,
			RegistrationCompleted: false,
			ErrorText: 'Ошибка',
			name: '',
			surname: '',
			patronymic: '',
			email: '',
			password: '',
		}
		this.closeModalWindow = this.closeModalWindow.bind(this)
		this.openModalWindow = this.openModalWindow.bind(this)
	}

	render() {
		return (
			<div className='AutorizationPage'>
				<div className='AutorizationImage'></div>
				<div className='AutorizationContainer'>
					<h1 className='AutorizationTitle'>Регистрация в Reinterio</h1>
					<p className='PageCardText'>Имя</p>
					<input
						pattern='[А-Яа-я]+'
						id='reg_name'
						type='text'
						maxLength='30'
						className='AutorizationTextArea'
						required={true}
						onChange={e => this.setState({ name: e.target.value })}
					></input>

					<p className='PageCardText'>Фамилия</p>
					<input
						pattern='[А-Яа-я]+'
						id='reg_surname'
						type='text'
						maxLength='30'
						className='AutorizationTextArea'
						onChange={e => this.setState({ surname: e.target.value })}
					></input>

					<p className='PageCardText'>Отчество</p>
					<input
						pattern='[А-Яа-я]+'
						id='reg_patronymic'
						type='text'
						maxLength='30'
						className='AutorizationTextArea'
						onChange={e => this.setState({ patronymic: e.target.value })}
					></input>

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

					<p className='PageCardText'>Повтор пароля</p>
					<div className='AutorizationPasswordFieldContainer'>
						<input
							pattern='^[a-zA-Z0-9]{8,50}$'
							id='reg_password_check'
							type={this.state.PasswordShowed ? 'text' : 'password'}
							maxLength='120'
							className='AutorizationPasswordField'
							required={true}
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

					<div
						onClick={() => this.startRegistration()}
						className='RegistrationButton'
					>
						Создать аккаунт
					</div>
					<Link
						to='/login'
						style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
					>
						<p>
							Уже есть аккаунт? <u>Войти</u>
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

	startRegistration() {
		this.setState({ RegistrationShowError: false })

		if (
			this.PasswordCheckValidate() &&
			this.PasswordEqual() &&
			this.CheckEmail() &&
			this.checkProfileInfoValidate()
		) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: this.state.name,
					surname: this.state.surname,
					patronymic: this.state.patronymic,
					email: this.state.email,
					password: this.state.password,
				}),
			}
			fetch('http://127.0.0.1:5000/user-auth/registration', requestOptions)
				.then(response => response.json())
				.then(result => {
					console.log(!result.error)
					if (!result.error) {
						// window.location.href = '/login'
					}
				})
				.catch(error => {
					console.log(error)
				})
			this.openModalWindow()
		} else if (!this.CheckEmail()) {
			this.setState({ ErrorText: 'Недействительный адрес электронной почты!' })
			this.setState({ RegistrationShowError: true })
		} else if (!this.PasswordCheckValidate()) {
			this.setState({
				ErrorText:
					'Минимальная длинна пароля - 8 символов. Он дожен состоять только из латинских букв и цифр',
			})
			this.setState({ RegistrationShowError: true })
		} else if (!this.PasswordEqual()) {
			this.setState({ ErrorText: 'Пароли не совпадают' })
			this.setState({ RegistrationShowError: true })
		} else if (!this.checkProfileInfoValidate()) {
			this.setState({
				ErrorText:
					'Поля ФИО должны быть заполненым русскими буквами, без использования символов и цифр',
			})
			this.setState({ RegistrationShowError: true })
		} else {
			this.setState({ ErrorText: 'Поля заполнены неверно' })
			this.setState({ RegistrationShowError: true })
		}
	}

	PasswordCheckValidate() {
		var inputpassword = document.getElementById('reg_password')

		if (inputpassword.checkValidity()) {
			return true
		} else {
			return false
		}
	}

	PasswordEqual() {
		var inputpassword = document.getElementById('reg_password')
		var inputpasswordcheck = document.getElementById('reg_password_check')

		console.log(inputpassword.value)
		console.log(inputpasswordcheck.value)
		console.log(inputpasswordcheck.value === inputpassword.value)

		if (inputpassword.value === inputpasswordcheck.value) {
			return true
		} else {
			return false
		}
	}

	CheckEmail() {
		var mailformat =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let email = document.getElementById('reg_email').value
		if (email.match(mailformat)) {
			return true
		} else {
			return false
		}
	}

	checkProfileInfoValidate() {
		var inputname = document.getElementById('reg_name')
		var inputsutname = document.getElementById('reg_surname')

		if (inputname.checkValidity() && inputsutname.checkValidity()) {
			return true
		} else {
			return false
		}
	}
}

export default RegistrationPage
