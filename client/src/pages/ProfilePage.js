import React, { Component } from 'react'
import 'react-phone-input-2/lib/style.css'
import { CSSTransition } from 'react-transition-group'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from "axios";

export class ProfilePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			lastOrder: [],

			SettingsShow: false,

			AddressChanged: false,
			AddressSaved: false,
			AddressShowError: false,

			ProfileSaved: false,
			ProfileChanged: false,
			ProfileErrorText: 'Заполните все поля!',
			ProfileShowError: false,

			PasswordChanged: false,
			PasswordSaved: false,
			PasswordShowed: false,
			PasswordErrorText: 'Пароль слишком корткий',
			PasswordShowError: false,
		}
	}

	getLastOrder() {
		const qs = require('qs')
		let data = qs.stringify({})

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url:
				`${process.env.REACT_APP_API_URL}/order/info/` +
				Number.parseInt(localStorage.getItem('userId')),
			headers: {},
			data: data,
		}

		axios
			.request(config)
			.then(response => {
				console.log(response.data)
			})
			.catch(error => {
				console.log(error)
			})
	}

	logOut() {
		localStorage.removeItem('userId')
		window.location.href = '/'
	}

	render() {
		if (!this.props.user) {
			return <div>Loading...</div> // or some other loading indicator
		}
		return (
			<div className='Content'>
				<div className='PageTitleContainer'>
					<div className='PageTitle'>
						<div className='PageTitleTextContainer'>
							<h1 className='PageTitleText'>
								{'Здравствуйте, ' + this.props.user?.user_name + '!'}
							</h1>
						</div>
						<div className='PageTitleLine' />
					</div>
				</div>
				<div className='PageCardsContainer'>
					<div style={{ zIndex: '9' }} className='PageCards'>

						<div className='PageCard'>
							<p className='PageCardTitle'>Последний заказ</p>
							<p>{'Здравствуйте, ' + this.state.lastOrder.order_id + '!'}</p>
						</div>

						<div className='SidePageCard'>
							<p className='PageCardTitle'>Ожидают отзыва</p>
						</div>

						<div className='SidePageCard'>
							<div className='PageCardButtonsWrapper'>
								<div className='PageCardButtonSecondType'>
									<i class='fi fi-rr-shopping-bag'></i>
									<p>Мои заказы</p>
								</div>

								<div className='PageCardButtonSecondType'>
									<i class='fi fi-rr-star'></i>
									<p>Мои отзывы</p>
								</div>

								<a href='#Settings'>
									<div
										onClick={() => this.ShowSettings()}
										className='PageCardButtonSecondType'
									>
										<i class='fi fi-rr-settings'></i>
										<p>
											{this.state.SettingsShow
												? 'Закрыть настройки'
												: 'Настройки'}
										</p>
									</div>
								</a>
							</div>

							<a target="_blank" href='/files/Справка Reinterio.pdf'>
								<div className='PageCardButtonSecondType'>
									<i class='fi fi-rr-search-alt'></i>
									<p>Помощь</p>
								</div></a>


							<div className='PageCardButtonsWrapper'>
								<div
									className='PageCardButtonSecondType'
									onClick={() => this.logOut()}
								>
									<i
										style={{ color: '#E04E20' }}
										class='fi fi-rr-sign-out-alt'
									></i>
									<p style={{ color: '#E04E20' }}>Выйти из аккаунта</p>
								</div>
							</div>
						</div>
					</div>

					{this.state.SettingsShow && <div id='Settings'></div>}
					<CSSTransition
						in={this.state.SettingsShow}
						timeout={1000}
						classNames='alert'
						unmountOnExit
					>
						<div className='PageCards'>
							<div
								style={{ zIndex: '1' }}
								id='SettingsPanel'
								className='SidePageCard'
							>
								<div className='PageCardTitleContainer'>
									<p className='PageCardTitle'>Личные данные</p>
									{this.state.ProfileChanged && (
										<div
											className='CardSmallButton'
											onClick={() => this.updateProfileInfo()}
										>
											Сохранить
										</div>
									)}
								</div>
								<p className='PageCardText'>Имя</p>
								<input
									pattern='[А-Яа-я]+'
									onChange={() => this.UpdateProfileInfo()}
									id='profile_name'
									type='text'
									maxLength='30'
									className='MainTextArea'
									required={true}
									defaultValue={this.props.user.user_name}
								></input>

								<p className='PageCardText'>Фамилия</p>
								<input
									pattern='[А-Яа-я]+'
									onChange={() => this.UpdateProfileInfo()}
									id='profile_surname'
									type='text'
									maxLength='30'
									className='MainTextArea'
									defaultValue={this.props.user.user_surname}
								></input>

								<p className='PageCardText'>Отчество</p>
								<input
									pattern='[А-Яа-я]+'
									onChange={() => this.UpdateProfileInfo()}
									id='profile_patronymic'
									type='text'
									maxLength='30'
									className='MainTextArea'
									defaultValue={this.props.user.user_patronymic}
								></input>

								<p className='PageCardText'>Электронная почта</p>
								<input
									onChange={() => this.UpdateProfileInfo()}
									id='profile_email'
									type='email'
									maxLength='30'
									className='MainTextArea'
									defaultValue={this.props.user.user_email}
								></input>

								<p className='PageCardText'>Телефон</p>
								<input
									onChange={() => this.UpdateProfileInfo()}
									id='profile_phone'
									pattern='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$'
									type='tel'
									maxLength='12'
									className='MainTextArea'
									defaultValue={this.props.user.user_phone}
								></input>

								<CSSTransition
									in={this.state.ProfileSaved}
									timeout={1000}
									classNames='smallalert'
									unmountOnExit
								>
									<p style={{ color: '#0A5954' }} className='PageCardText'>
										Успешно сохранено!
									</p>
								</CSSTransition>
								<CSSTransition
									in={this.state.ProfileShowError}
									timeout={1000}
									classNames='smallalert'
									unmountOnExit
								>
									<p style={{ color: '#E04E20' }} className='PageCardText'>
										{this.state.ProfileErrorText}
									</p>
								</CSSTransition>
							</div>

							<div className='PageCard'>
								<div className='PageCardTitleContainer'>
									<p className='PageCardTitle'>Адрес доставки</p>
									{this.state.AddressChanged && (
										<div
											className='CardSmallButton'
											onClick={() => this.updateProfileAddress()}
										>
											Сохранить
										</div>
									)}
								</div>
								<p style={{ color: '#B4A39A' }} className='PageCardText'>
									{this.props.user.user_address !== null
										? 'Последний указанный адрес доставки'
										: 'Вы еще не указали адрес доставки'}
								</p>
								<input
									pattern='[А-Яа-я]+'
									onChange={() => this.UpdateProfileAddress()}
									id='profile_address'
									type='text'
									maxLength='70'
									className='MainTextArea'
									defaultValue={this.props.user.user_address}
									placeholder='Например: Москва, ул. Реинтерная 28, кв 15'
								></input>
								<CSSTransition
									in={this.state.AddressSaved}
									timeout={1000}
									classNames='smallalert'
									unmountOnExit
								>
									<p style={{ color: '#0A5954' }} className='PageCardText'>
										Успешно сохранено!
									</p>
								</CSSTransition>
								<CSSTransition
									in={this.state.AddressShowError}
									timeout={1000}
									classNames='smallalert'
									unmountOnExit
								>
									<p style={{ color: '#E04E20' }} className='PageCardText'>
										Заполните поле адреса!
									</p>
								</CSSTransition>
							</div>

							<div className='SidePageCard'>
								<div className='PageCardTitleContainer'>
									<p className='PageCardTitle'>Безопасность</p>
									<div
										style={{
											display: 'Flex',
											flexDirection: 'row',
											gap: '10px',
										}}
									>
										{this.state.PasswordChanged && (
											<div
												className='CardSmallButtonSecondary'
												onClick={() => (
													this.setState({
														PasswordChanged: !this.state.PasswordChanged,
													}),
													this.setState({ PasswordShowed: false }),
													this.setState({ PasswordShowError: false }),
													this.setState({ PasswordSaved: false })
												)}
											>
												<i
													style={{ fontSize: '12px' }}
													class='fi fi-rr-cross'
												></i>
											</div>
										)}
										<div
											className={
												this.state.PasswordChanged
													? 'CardSmallButton'
													: 'CardSmallButtonSecondary'
											}
											onClick={() =>
												!this.state.PasswordChanged
													? (this.setState({
														PasswordChanged: !this.state.PasswordChanged,
													}),
														this.setState({ PasswordShowed: false }),
														this.setState({ PasswordShowError: false }),
														this.setState({ PasswordSaved: false }))
													: this.UpdateProfilePassword()
											}
										>
											{this.state.PasswordChanged
												? 'Сохранить'
												: 'Сменить пароль'}
										</div>
									</div>
								</div>
								<p style={{ color: '#B4A39A' }} className='PageCardText'>
									{this.state.PasswordChanged
										? 'Установка нового пароля'
										: 'Установлен надежный пароль'}
								</p>
								<div className='PasswordFieldContainer'>
									{!this.state.PasswordChanged && (
										<input
											type='password'
											readOnly='true'
											className='PasswordField'
											defaultValue={'**********'}
										></input>
									)}

									{this.state.PasswordChanged && (
										<input
											pattern='^[a-zA-Z0-9]{8,50}$'
											id='profile_password'
											type={this.state.PasswordShowed ? 'text' : 'password'}
											maxLength='120'
											className='PasswordField'
											required={true}
										></input>
									)}

									{this.state.PasswordChanged && (
										<div
											className='ShowPasswordButton'
											onClick={() =>
												this.setState({
													PasswordShowed: !this.state.PasswordShowed,
												})
											}
										>
											{this.state.PasswordShowed ? (
												<i class='fi fi-rr-eye'></i>
											) : (
												<i class='fi fi-rr-eye-crossed'></i>
											)}
										</div>
									)}
								</div>
								<CSSTransition
									in={this.state.PasswordSaved}
									timeout={1000}
									classNames='smallalert'
									unmountOnExit
								>
									<p style={{ color: '#0A5954' }} className='PageCardText'>
										Успешно сохранено!
									</p>
								</CSSTransition>
								<CSSTransition
									in={this.state.PasswordChanged}
									timeout={1000}
									classNames='smallalert'
									unmountOnExit
								>
									<p style={{ color: '#B4A39A' }} className='PageCardText'>
										Подтверждение пароля
									</p>
								</CSSTransition>
								<CSSTransition
									in={this.state.PasswordChanged}
									timeout={1000}
									classNames='smallalert'
									unmountOnExit
								>
									<div className='PasswordFieldContainer'>
										<input
											pattern='^[a-zA-Z0-9]{8,50}$'
											id='profile_password_check'
											type={this.state.PasswordShowed ? 'text' : 'password'}
											maxLength='120'
											className='PasswordField'
											required={true}
										></input>
										<div
											className='ShowPasswordButton'
											onClick={() =>
												this.setState({
													PasswordShowed: !this.state.PasswordShowed,
												})
											}
										>
											{this.state.PasswordShowed ? (
												<i class='fi fi-rr-eye'></i>
											) : (
												<i class='fi fi-rr-eye-crossed'></i>
											)}
										</div>
									</div>
								</CSSTransition>
								<CSSTransition
									in={this.state.PasswordShowError}
									timeout={1000}
									classNames='smallalert'
									unmountOnExit
								>
									<p style={{ color: '#E04E20' }} className='PageCardText'>
										{this.state.PasswordErrorText}
									</p>
								</CSSTransition>
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
		if (!this.PasswordEqual()) {
			this.ShowPasswordError('Пароли не совпадают')
		} else if (this.PasswordCheckValidate() && this.PasswordEqual()) {
			this.setState({ PasswordSaved: true })
			this.setState({ PasswordChanged: !this.state.PasswordChanged })
			this.setState({ PasswordShowed: false })
			this.setState({ PasswordShowError: false })

			const myHeaders = new Headers()
			myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

			const urlencoded = new URLSearchParams()
			urlencoded.append(
				'password',
				document.getElementById('profile_password').value
			)

			const requestOptions = {
				method: 'PUT',
				headers: myHeaders,
				body: urlencoded,
				redirect: 'follow',
			}

			fetch(
				`${process.env.REACT_APP_API_URL}/user/updatepassword/` + this.props.user.user_id,
				requestOptions
			)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.error(error))
		} else {
			this.ShowPasswordError(
				'Минимальная длинна пароля - 8 символов. Он дожен состоять только из латинских букв и цифр'
			)
		}
	}

	ShowPasswordError(ErrorText) {
		this.setState({ PasswordShowError: true })
		this.setState({ PasswordErrorText: ErrorText })
	}

	PasswordCheckValidate() {
		var inputpassword = document.getElementById('profile_password')

		if (inputpassword.checkValidity()) {
			return true
		} else {
			return false
		}
	}

	PasswordEqual() {
		var inputpassword = document.getElementById('profile_password')
		var inputpasswordcheck = document.getElementById('profile_password_check')

		if (inputpassword.value === inputpasswordcheck.value) {
			return true
		} else {
			return false
		}
	}

	UpdateProfileAddress() {
		this.setState({ AddressSaved: false })
		this.setState({ AddressChanged: true })
		this.setState({ AddressShowError: false })
	}

	updateProfileAddress() {
		if (document.getElementById('profile_address').value !== '') {
			const myHeaders = new Headers()
			myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

			const urlencoded = new URLSearchParams()
			urlencoded.append(
				'address',
				document.getElementById('profile_address').value
			)

			const requestOptions = {
				method: 'PUT',
				headers: myHeaders,
				body: urlencoded,
				redirect: 'follow',
			}

			fetch(
				`${process.env.REACT_APP_API_URL}/user/updateaddress/` + this.props.user.user_id,
				requestOptions
			)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.error(error))

			this.setState({ AddressSaved: true })
			this.setState({ AddressChanged: false })
		} else {
			this.setState({ AddressShowError: true })
		}
	}

	ShowSettings() {
		this.setState({ SettingsShow: !this.state.SettingsShow })
		if (!this.state.SettingsShow) {
			this.setState({ ProfileChanged: false })
			this.setState({ ProfileSaved: false })
			this.setState({ ProfileShowError: false })

			this.setState({ AddressChanged: false })
			this.setState({ AddressSavedSaved: false })
			this.setState({ AddressShowErrorError: false })

			this.setState({ PasswordChanged: false })
			this.setState({ PasswordSaved: false })
			this.setState({ PasswordShowError: false })
			this.setState({ PasswordShowed: false })
		}
	}

	ShowProfileError(ErrorText) {
		this.setState({ ProfileShowError: true })
		this.setState({ ProfileErrorText: ErrorText })
	}

	UpdateProfileInfo() {
		this.setState({ ProfileShowError: false })
		this.setState({ ProfileSaved: false })
		this.setState({ ProfileChanged: true })
	}

	CheckEmail() {
		var mailformat =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let email = document.getElementById('profile_email').value
		if (email.match(mailformat)) {
			return true
		} else {
			return false
		}
	}

	CheckPhone() {
		var inputphone = document.getElementById('profile_phone')

		if (inputphone.checkValidity()) {
			var digits = inputphone.value.replace(/^8/, '7').replace(/[^\d]+/, '')
			document.getElementById('profile_phone').value = "+" + digits.replace(
				/^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/,
				'$1 $2 $3 $4 $5'
			)
			return true
		} else {
			return false
		}
	}

	checkProfileInfoValidate() {
		var inputname = document.getElementById('profile_name')
		var inputsutname = document.getElementById('profile_surname')

		if (inputname.checkValidity() && inputsutname.checkValidity()) {
			return true
		} else {
			return false
		}
	}

	updateProfileInfo() {
		this.CheckEmail()
		if (
			this.CheckEmail() &&
			this.checkProfileInfoValidate() &&
			this.CheckPhone()
		) {
			const myHeaders = new Headers()
			myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

			const urlencoded = new URLSearchParams()
			urlencoded.append('name', document.getElementById('profile_name').value)
			urlencoded.append(
				'surname',
				document.getElementById('profile_surname').value
			)
			urlencoded.append(
				'patronymic',
				document.getElementById('profile_patronymic').value
			)
			urlencoded.append('email', document.getElementById('profile_email').value)
			urlencoded.append('phone', document.getElementById('profile_phone').value)

			const requestOptions = {
				method: 'PUT',
				headers: myHeaders,
				body: urlencoded,
				redirect: 'follow',
			}

			fetch(
				`${process.env.REACT_APP_API_URL}/user/updateprofile/` + this.props.user.user_id,
				requestOptions
			)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.error(error))

			this.setState({ ProfileSaved: true })
			this.setState({ ProfileChanged: false })
		} else if (!this.CheckEmail()) {
			this.ShowProfileError('Недействительный адрес электронной почты!')
		} else if (!this.checkProfileInfoValidate()) {
			this.ShowProfileError(
				'Поля ФИО должны быть заполненым русскими буквами, без использования символов и цифр'
			)
		} else if (!this.CheckPhone()) {
			this.ShowProfileError('Недействительный номер телефона!')
		} else {
			this.ShowProfileError('Поля заполнены неверно!')
		}
	}
}

export default ProfilePage
