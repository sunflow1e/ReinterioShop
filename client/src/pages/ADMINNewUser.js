import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMINHeader } from '../components/ADMINHeader';
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import Modal from '../components/Modal';


export class ADMINNewUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            PasswordChanged: true,
            CurrentRole: 0,
            RegistrationShowError: false,
            RegistrationCompleted: false,
            ErrorText: 'Ошибка',
            IsModalShown: false,
        }

        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/user`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                this.setState({ users: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (
            <>
                {this.props.user?.user_role === 1 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Добавление пользователя</h1>
                            </div>

                            <div class="PageTitleLine" />
                        </div>
                        <div>
                            <div className='PageCardsContainer'>
                                <div className='PageCards'>

                                    <div className='PageCard'>
                                        <p className='PageCardText'>Имя</p>
                                        <input
                                            pattern='[А-Яа-я]+'
                                            id='reg_name'
                                            type='text'
                                            maxLength='30'
                                            className='MainTextArea'
                                            required={true}
                                        ></input>

                                        <p className='PageCardText'>Фамилия</p>
                                        <input
                                            pattern='[А-Яа-я]+'
                                            id='reg_surname'
                                            type='text'
                                            maxLength='30'
                                            className='MainTextArea'
                                        ></input>

                                        <p className='PageCardText'>Отчество</p>
                                        <input
                                            pattern='[А-Яа-я]+'
                                            id='reg_patronymic'
                                            type='text'
                                            maxLength='30'
                                            className='MainTextArea'
                                        ></input>

                                        <p className='PageCardText'>Электронная почта</p>
                                        <input
                                            id='reg_email'
                                            type='email'
                                            maxLength='30'
                                            className='MainTextArea'
                                        ></input>

                                        <p className='PageCardText'>Пароль</p>

                                        <div className='PasswordFieldContainer'>
                                            {this.state.PasswordChanged && (
                                                <input
                                                    pattern='^[a-zA-Z0-9]{8,50}$'
                                                    id='reg_password'
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



                                        <p className='PageCardText'>Повтор пароля</p>


                                        <div className='PasswordFieldContainer'>
                                            {this.state.PasswordChanged && (
                                                <input
                                                    pattern='^[a-zA-Z0-9]{8,50}$'
                                                    id='reg_password_check'
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




                                        <p className='PageCardText'>Роль</p>

                                        <div style={{ marginBottom: "30px" }} className='PageTitleButtonsContainer'>
                                            <div onClick={() => this.setState({ CurrentRole: 1 })} className={this.state.CurrentRole === 1 ? 'RegistrationButton' : 'ModalSecondaryButton'}>Пользователь</div>
                                            <div onClick={() => this.setState({ CurrentRole: 2 })} className={this.state.CurrentRole === 2 ? 'RegistrationButton' : 'ModalSecondaryButton'}>Администратор</div>
                                        </div>

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

                                        <div onClick={() => this.AddUser()} className='RegistrationButton'>
                                            Добавить пользователя
                                        </div>
                                    </div>

                                    {this.state.IsModalShown && (
                                        <Modal
                                            closeModalWindow={this.closeModalWindow}
                                            ModalTitle={'Пользователь успешно создан!'}
                                            ModalText={
                                                'Теперь пользователь может авторизоваться в системе и начать работу'
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <ADMINHeader />
                        <Footer />
                    </div>
                }
                {this.props.user?.user_role === 2 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Доступ запрещен</h1>
                            </div>

                            <div class="PageTitleLine" />
                        </div>

                        <div class='PageContent'>
                            <div class='CartCardsContainer'>
                                <div
                                    style={{ flexDirection: 'column', gap: '5px' }}
                                    class='CartCard'
                                >
                                    <p style={{ fontSize: '32px' }} class='AlertContainerTitle'>
                                        У вас нет доступа к данной странице
                                    </p>
                                    <a href='../catalogue'>
                                        <div class='MainButton'>Каталог товаров</div>
                                    </a>
                                </div>
                            </div>
                            <div class='PageSideContainer' />
                        </div>
                        <Header />
                        <Footer />
                    </div>
                }
            </>
        )
    }

    closeModalWindow() {
        window.location.href = '/admin/shop'
    }

    showModal() {
        this.setState({ IsModalShown: true })
    }

    AddUser() {
        this.setState({ RegistrationShowError: false })

        if (
            this.PasswordCheckValidate() &&
            this.PasswordEqual() &&
            this.CheckEmail() &&
            this.checkProfileInfoValidate() &&
            this.checkRole() &&
            !this.checkExist()
        ) {
            const qs = require('qs');
            let data = qs.stringify({
                'email': document.getElementById('reg_email').value,
                'name': document.getElementById('reg_name').value,
                'surname': document.getElementById('reg_surname').value,
                'isactivated': true,
                'patronymic': document.getElementById('reg_patronymic').value,
                'role': this.state.CurrentRole,
                'password': document.getElementById('reg_password').value
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_API_URL}/user`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    this.showModal();
                })
                .catch((error) => {
                    console.log(error);
                });

        } else if (this.checkExist()) {
            this.setState({
                ErrorText:
                    'Пользователь уже зарегистрирован в системе',
            })
            this.setState({ RegistrationShowError: true })

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
        }

        else if (!this.checkRole()) {
            this.setState({
                ErrorText:
                    'Необходимо выбрать роль',
            })
            this.setState({ RegistrationShowError: true })
        } else {
            this.setState({ ErrorText: 'Поля заполнены неверно' })
            this.setState({ RegistrationShowError: true })
        }
    }

    checkRole() {
        if (this.state.CurrentRole !== 0) {
            return true
        } else {
            return false
        }
    }

    checkExist() {
        if (this.state.users) {
            let allusers = this.state.users;
            let email = document.getElementById('reg_email').value

            for (let i = 0; i < allusers.length; i++) {
                if (allusers[i].user_email === email) {
                    return true
                }
            }

            return false
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

export default ADMINNewUser