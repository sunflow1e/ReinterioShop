import React, { Component } from 'react'
import CategoriesContainer from './CategoriesContainer'
import axios from 'axios';
import Bubble from './Bubble';
import { CSSTransition } from 'react-transition-group'
import BubbleCategory from './BubbleCategory';
import FilterColor from './FilterColor';

export class ADMINHeader extends Component {

    render() {
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
                            <a href="/admin/shop"><div id="MainMenuCategory" class="FirstItem"><i class="fi fi-rr-chart-histogram"></i><h>Магазин</h></div></a>
                            <a href="/admin/orders"><div id="MainMenuCategory" class="FirstItem"><i class="fi fi-rr-shopping-bag"></i><h>Заказы</h></div></a>
                            <a href="/admin/products"><div id="MainMenuCategory" class="FirstItem"><i class="fi fi-rr-box-alt"></i><h>Товары</h></div></a>
                            <a href="/profile"><div id="MainMenuCategory" class="FirstItem"><i class="fi fi-rr-smile"></i><h>Аккаунт</h></div></a>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
};

export default ADMINHeader