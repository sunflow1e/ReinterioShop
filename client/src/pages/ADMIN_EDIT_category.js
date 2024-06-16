import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import EDIT_CATEGORY from '../components/EDIT_CAREGORY';


export class ADMIN_EDIT_category extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            orders: [],
            IsModalShown: false,
        }
        this.deleteCategory = this.deleteCategory.bind(this)
    }

    componentDidMount() {
        this.getCategory();
    }

    getCategory() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/category`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ categories: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (
            <>
                {this.props.user?.user_role === 2 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Управление категориями</h1>
                            </div>

                            <div class="PageTitleLine"></div>
                        </div>
                        <div>

                        </div>
                        <div className='ReviewCard'>
                            {this.state.categories?.map(category => (
                                <EDIT_CATEGORY
                                    key={category.category_id}
                                    categoryid={category.category_id}
                                    user_id={localStorage.getItem('userId')}
                                    category={category}
                                    deleteCategory={this.deleteCategory}
                                />
                            ))}

                            <div onClick={() => this.addCategory()} style={{ width: "300px" }} className='ModalMainButtonGreen'>Добавить категорию</div>
                        </div>


                        <ADMINHeader />
                        <Footer />
                    </div>
                }
                {this.props.user?.user_role === 1 &&
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

    addCategory() {
        let objectToAdd = [{ category_id: 999, category_name: '' }];
        let newArray = this.state.categories;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ categories: newArray })
    }

    deleteCategory(id) {
        let origin = this.state.categories
        origin = origin.filter(a => a.category_id !== id)
        this.setState({ categories: origin })

        this.deleteFromBD(id)
    }


    deleteSubcategoriesOfCategoryFromBD(id) {

        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/product/categories/` + id,
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
            url: `${process.env.REACT_APP_API_URL}/category/` + id,
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

export default ADMIN_EDIT_category