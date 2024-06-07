import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import EDIT_STYLE from '../components/EDIT_STYLE';


export class ADMIN_EDIT_styles extends Component {
    constructor(props) {
        super(props)

        this.state = {
            styles: [],
            orders: [],
            IsModalShown: false,
        }
        this.deleteStyle = this.deleteStyle.bind(this)
    }

    componentDidMount() {
        this.getStyles();
    }

    getStyles() {
        const qs = require('qs')
        let data = qs.stringify({})

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:
                `${process.env.REACT_APP_API_URL}/style`,
            headers: {},
            data: data,
        }

        axios
            .request(config)
            .then(response => {
                this.setState({ styles: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <>
                {this.props.user?.user_role === 1 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Управление стилями</h1>
                            </div>

                            <div class="PageTitleLine"></div>
                        </div>
                        <div>

                        </div>
                        <div className='ReviewCard'>
                            {this.state.styles?.map(style => (
                                <EDIT_STYLE
                                    key={style.style_id}
                                    user_id={localStorage.getItem('userId')}
                                    style={style}
                                    deleteStyle={this.deleteStyle}
                                />
                            ))}

                            <div onClick={() => this.addStyle()} style={{ width: "300px" }} className='ModalMainButtonGreen'>Добавить стиль</div>
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

    addStyle() {
        let objectToAdd = [{ style_id: 999, style_name: '' }];
        let newArray = this.state.styles;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ styles: newArray })
    }

    deleteStyle(id) {
        let origin = this.state.styles
        origin = origin.filter(a => a.style_id !== id)
        this.setState({ styles: origin })


        this.deleteLinksFromBD(id)
        this.deleteFromBD(id)
    }


    deleteLinksFromBD(id) {

        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/product/styles/` + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    deleteFromBD(id) {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/style/` + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }
}

export default ADMIN_EDIT_styles