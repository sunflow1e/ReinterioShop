import React from "react";

export default function Footer(){
    return(
        <footer>

<div class = "Footer">
        <div style = {{marginTop: "50px"}} class = "Content">
            <div style={{display: "flex", flexDirection: "row", gap: "3%", alignItems: "end", paddingBottom: "50px"}}>
                <a href = "#StartPage"><img src="/img/FooterLogo.png" alt=""></img></a>
                <h style = {{fontSize: "32px", fontFamily: "raleway semibold"}}>Reinterio</h>
            </div>
            <div class = "FooterInfo">
                <div class = "FooterContainer">
                    <b>Компания</b>
                    <a href="/home">О нас</a>
                    <a href="/contacts">Контакты</a>
                    <a href="/policy">Политика конфиденциальности</a>
                </div>

                <div class = "FooterContainer">
                    <b>Услуги</b>
                    <a href="/delievery">Доставка</a>
                    <a href="/return">Возврат товара</a>
                </div>

                <div class = "FooterContainer">
                    <b>Магазин</b>
                    <a href="">Справка</a>
                    <a href="">Категории</a>
                    <a href="">Избранное</a>
                    <a href="">Корзина</a>
                    <a href="">Аккаунт</a>
                </div>
            </div>
            <p style={{marginBottom: "20px"}} class = "FooterCopyright">2024 © ООО «Reinterio». Все права защищены</p>
        </div> 
    
    </div>

        </footer>
    )
};