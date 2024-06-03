import React, { Component } from 'react'
import CategoriesContainer from './CategoriesContainer'
import axios from 'axios';
import Bubble from './Bubble';
import { CSSTransition } from 'react-transition-group'
import BubbleCategory from './BubbleCategory';
import FilterColor from './FilterColor';

export class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            currentCategory: 1,
            priceFilter: 0,
            styles: [],
            subcategories: [],
            categories: [],
            colors: [],
        }
        this.changeSelectedStyle = this.changeSelectedStyle.bind(this)
        this.changeSelectedSubcategory = this.changeSelectedSubcategory.bind(this)
        this.changeCurrentCategory = this.changeCurrentCategory.bind(this)
        this.changeSelectedColor = this.changeSelectedColor.bind(this)
    }

    componentDidMount() {
        this.getCategories()
        this.getStyles()
        this.getSubCategories()
        this.getColors();

        if (Number.parseInt(localStorage.getItem('price')) != 0) this.setState({ priceFilter: Number.parseInt(localStorage.getItem('price')) })
    }

    getCategories() {
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

    getStyles() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/style',
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ styles: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getSubCategories() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/subcategory`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ subcategories: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getColors() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/colors/all`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ colors: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        let FilterButton = false;
        if (localStorage.getItem('price') || localStorage.getItem('colors') || localStorage.getItem('subcategories') || localStorage.getItem('style')) {
            FilterButton = true;
        }

        document.addEventListener('keyup', event => {
            if (event.code === 'Enter' && document.getElementById('SearchString').value != '') this.Search();
        });

        const category_index = this.state.categories
            .map(a => a.category_id)
            .indexOf(this.state.currentCategory)

        let Category_name = "Подкатегории";

        this.state.categories.map(c => (Category_name = c.category_id === this.state.currentCategory ? c.category_name : Category_name));

        return (
            <header>

                <div class="MainMenu">
                    <a href="/home"><div class="Logo"><img style={{ maxWidth: "90px" }} src="\img\Logo.png"></img></div></a>
                    <div class="Menu">
                        <div class="MenuItems" id="SecondMenu">
                            <a href="/contacts"><div class="SecondItem"><i class="fi fi-rr-users"></i>Контакты</div></a>
                            <a href="/delievery"><div class="SecondItem"><i class="fi fi-rr-truck-side"></i>Доставка</div></a>
                            <a href="/return"><div class="SecondItem"><i class="fi fi-rr-box"></i>Возврат</div></a>
                        </div>
                        <div class="MenuItems" id="FirstMenu">
                            <a href="/catalogue"><div id="MainMenuCategory" class="FirstItem"><i class="fi fi-rr-apps"></i><h>Каталог</h></div></a>

                            <div class="Explore">
                                <div class="Search">
                                    <input id="SearchString" autocomplete="off"
                                        defaultValue={localStorage.getItem('search') != '' && localStorage.getItem('search') != null != null ? localStorage.getItem('search') : null}
                                        placeholder={localStorage.getItem('search') != '' && localStorage.getItem('search') != null != null ? "Поиск в каталоге" : null}
                                        class="SearchString" /><i id="StartSearch" onClick={() => this.Search()} class="fi fi-rr-search"></i>
                                </div>

                                {(localStorage.getItem('search') != '' && localStorage.getItem('search') != null) &&
                                    <div onClick={() => this.clearSearch()} id="MainMenuFilter" className="FirstItem"><i class="fi fi-rr-cross-small"></i></div>
                                }

                                <div onClick={() => this.openModalWindow()} id={FilterButton ? "MainMenuFilterActive" : "MainMenuFilter"} className="FirstItem"><i class="fi fi-rr-filter"></i><h>Фильтр</h></div>
                            </div>

                            <a href="/favourite"><div id="MainMenuFavourite" class="FirstItem"><i class="fi fi-rr-heart"></i><h>Избранное</h></div></a>
                            <a href="/cart"><div id="MainMenuCart" class="FirstItem"><i class="fi fi-rr-shopping-cart"></i><h>Корзина</h></div></a>
                            <a href="/profile"><div id="MainMenuProfile" class="FirstItem"><i class="fi fi-rr-smile"></i><h>Аккаунт</h></div></a>
                        </div>
                    </div>
                </div>

                <CSSTransition
                    in={this.state.showModal}
                    timeout={500}
                    classNames='smallalert'
                    unmountOnExit
                >
                    <div style={{ zIndex: "100" }} className='ModalBackground'>
                        <div className="Content">
                            <div className='FilterWindow'>
                                <div
                                    className='CloseModal'
                                >
                                    <i
                                        onClick={() => this.closeModalWindow()}
                                        style={{ color: '#636363' }}
                                        class='fi fi-rr-cross-small'
                                    ></i>
                                </div>
                                <div>
                                    <div className='FilterContainer'>
                                        <CategoriesContainer changeCurrentCategory={this.changeCurrentCategory} small={true} categories={this.state.categories} />
                                        <div className='AllFiltersContainer'>
                                            <div className='StylesCategoriesContainer'>
                                                <div className='GrayBackground'>
                                                    <b className='PageCardText'>{Category_name}</b>
                                                    <div className='StylesContainer'>
                                                        {this.state.subcategories.filter(subc => subc.subcategory_category === this.state.currentCategory).map(subcategory => (
                                                            <BubbleCategory
                                                                changeSelected={this.changeSelectedSubcategory}
                                                                key={subcategory.subcategory_id}
                                                                subcategory={subcategory}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className='GrayBackground'>
                                                    <b className='PageCardText'>Стили</b>
                                                    <div className='StylesContainer'>
                                                        {this.state.styles?.map(style => (
                                                            <Bubble
                                                                changeSelected={this.changeSelectedStyle}
                                                                key={style.style_id}
                                                                style={style}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='GrayBackground'>
                                                <b className='PageCardText'>Цвета</b>
                                                <div className='AllColorsContainer'>
                                                    {this.state.colors?.map(Color => (
                                                        <FilterColor changeSelectedColor={this.changeSelectedColor} key={Color.color_id} color={Color} />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className='GrayBackground'>
                                                <b className='PageCardText'>Стоимость</b>
                                                <div className='StylesContainer'>
                                                    <div onClick={() => { this.changePrice(1) }}
                                                        className={this.state.priceFilter === 1 ? 'SelectedBubble' : 'Bubble'}>
                                                        До 10 000 ₽
                                                    </div>

                                                    <div onClick={() => { this.changePrice(2) }}
                                                        className={this.state.priceFilter === 2 ? 'SelectedBubble' : 'Bubble'}>
                                                        До 50 000 ₽
                                                    </div>

                                                    <div onClick={() => { this.changePrice(3) }}
                                                        className={this.state.priceFilter === 3 ? 'SelectedBubble' : 'Bubble'}>
                                                        От 50 000 ₽ до 100 000 ₽
                                                    </div>

                                                    <div onClick={() => { this.changePrice(4) }}
                                                        className={this.state.priceFilter === 4 ? 'SelectedBubble' : 'Bubble'}>
                                                        100 000 ₽ и выше
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='PageTitleButtonsContainer'>
                                                <div onClick={() => { this.clearFilters() }} className='ModalSecondaryButton'>Сбросить фильтры</div>
                                                <div onClick={() => { this.Filter() }} className='ModalMainButtonGreen'>Применить фильтры</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>

                <div class="MobileMenu">
                    <div class="MobileMenuItemsContainer">
                        <a href="/home"><div class="MobileMenuItem">
                            <div class="MobileMenuIconContainer"><i class="fi fi-rr-home" id="MobileMenuHomeIcon"></i></div>
                            <h>Главная</h>
                        </div></a>

                        <a href="/catalogue"><div class="MobileMenuItem">
                            <div class="MobileMenuIconContainer"><i class="fi fi-rr-apps" id="MobileMenuHomeIcon"></i></div>
                            <h>Каталог</h>
                        </div></a>

                        <a href="/favourite"><div class="MobileMenuItem">
                            <div class="MobileMenuIconContainer"><i class="fi fi-rr-heart" id="MobileMenuHomeIcon"></i></div>
                            <h>Избранное</h>
                        </div></a>

                        <a href="/cart"><div class="MobileMenuItem">
                            <div class="MobileMenuIconContainer"><i class="fi fi-rr-shopping-cart" id="MobileMenuHomeIcon"></i></div>
                            <h>Корзина</h>
                        </div></a>

                        <a href="/profile"><div class="MobileMenuItem">
                            <div class="MobileMenuIconContainer"><i class="fi fi-rr-smile" id="MobileMenuHomeIcon"></i></div>
                            <h>Аккаунт</h>
                        </div></a>
                    </div>
                </div>

            </header>
        )
    }


    Search() {
        if (document.getElementById('SearchString').value != '') {
            const search = document.getElementById('SearchString').value
            localStorage.setItem('search', search)

            window.location.href = '/search'
        }
    }

    Filter() {

        const styles = this.state.styles.filter(item => item.style_ischecked === true)
        localStorage.setItem('styles', JSON.stringify(styles))

        const colors = this.state.colors.filter(item => item.color_ischecked === true)
        localStorage.setItem('colors', JSON.stringify(colors))

        const price = this.state.priceFilter
        localStorage.setItem('price', price)

        const subcategories = this.state.subcategories.filter(item => item.subcategory_ischecked === true)
        localStorage.setItem('subcategories', JSON.stringify(subcategories))

        window.location.href = '/search'
    }


    closeModalWindow() {
        this.setState({ showModal: false })
    }

    openModalWindow() {
        this.setState({ showModal: true })
    }

    changeSelectedStyle(styleid, selection) {
        const productindex = this.state.styles
            .map(a => a.style_id)
            .indexOf(styleid)
        const originproducts = this.state.styles
        originproducts[productindex].style_ischecked = selection

        this.setState({ styles: originproducts })
    }

    changeSelectedSubcategory(styleid, selection) {
        const productindex = this.state.subcategories
            .map(a => a.subcategory_id)
            .indexOf(styleid)
        const originproducts = this.state.subcategories
        originproducts[productindex].subcategory_ischecked = selection

        this.setState({ subcategories: originproducts })
    }

    changeSelectedColor(colorid, selection) {
        const productindex = this.state.colors
            .map(a => a.color_id)
            .indexOf(colorid)
        const originproducts = this.state.colors
        originproducts[productindex].color_ischecked = selection

        this.setState({ colors: originproducts })
    }

    clearFilters() {
        localStorage.removeItem('price')
        localStorage.removeItem('styles')
        localStorage.removeItem('subcategories')
        localStorage.removeItem('colors')
        this.state.showModal = false;

        window.location.href = '/search'
    }

    clearSearch() {
        localStorage.removeItem('search')

        window.location.href = '/search'
    }

    changeCurrentCategory(id) {
        this.setState({ currentCategory: id })
    }

    changePrice(id) {
        this.setState({ priceFilter: id })
    }
};

export default Header