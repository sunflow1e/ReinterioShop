import React from "react";

export default function Header(){
    return(
        <header>

    <div class = "MainMenu">
        <a href = "/home"><div class = "Logo"><img style = {{maxWidth: "90px"}} src="\img\Logo.png"></img></div></a>
        <div class = "Menu">
            <div class = "MenuItems" id = "SecondMenu">
                <a href="/contacts"><div class = "SecondItem"><i class="fi fi-rr-users"></i>Контакты</div></a>
                <a href="/delievery"><div class = "SecondItem"><i class="fi fi-rr-truck-side"></i>Доставка</div></a>
                <a href="/return"><div class = "SecondItem"><i class="fi fi-rr-box"></i>Возврат</div></a>
            </div>
            <div class = "MenuItems" id = "FirstMenu">
            <a href = "/catalogue"><div id = "MainMenuCategory" class = "FirstItem"><i class="fi fi-rr-apps"></i><h>Каталог</h></div></a>
                
                <div class ="Explore">
                    <div class = "Search">
                        <textarea placeholder="Поиск по названию" class = "SearchString"></textarea><i id = "StartSearch" class="fi fi-rr-search"></i>
                    </div>
                    <div id = "MainMenuFilter" class = "FirstItem"><i class="fi fi-rr-filter"></i><h>Фильтр</h></div>
                </div>

                <a href = "/favourite"><div id = "MainMenuFavourite" class = "FirstItem"><i class="fi fi-rr-heart"></i><h>Избранное</h></div></a>
                <a href = "/cart"><div id = "MainMenuCart" class = "FirstItem"><i class="fi fi-rr-shopping-cart"></i><h>Корзина</h></div></a>
                <a href = "/profile"><div id = "MainMenuProfile" class = "FirstItem"><i class="fi fi-rr-smile"></i><h>Аккаунт</h></div></a>
            </div>
        </div>
    </div>

    <div class = "MobileMenu">
        <div class = "MobileMenuItemsContainer">
            <a href = "/home"><div class = "MobileMenuItem">
                <div class = "MobileMenuIconContainer"><i class="fi fi-rr-home" id = "MobileMenuHomeIcon"></i></div>
                <h>Главная</h>
            </div></a>

            <a href = "/catalogue"><div class = "MobileMenuItem">
                <div class = "MobileMenuIconContainer"><i class="fi fi-rr-apps" id = "MobileMenuHomeIcon"></i></div>
                <h>Каталог</h>
            </div></a>

            <a href = "/favourite"><div class = "MobileMenuItem">
                <div class = "MobileMenuIconContainer"><i class="fi fi-rr-heart" id = "MobileMenuHomeIcon"></i></div>
                <h>Избранное</h>
            </div></a>

            <a href = "/cart"><div class = "MobileMenuItem">
                <div class = "MobileMenuIconContainer"><i class="fi fi-rr-shopping-cart" id = "MobileMenuHomeIcon"></i></div>
                <h>Корзина</h>
            </div></a>

            <a href = "/profile"><div class = "MobileMenuItem">
                <div class = "MobileMenuIconContainer"><i class="fi fi-rr-smile" id = "MobileMenuHomeIcon"></i></div>
                <h>Аккаунт</h>
            </div></a>
        </div>
    </div>

    </header>
    )
};