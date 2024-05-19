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
                    <a href="">О нас</a>
                    <a href="">Контакты</a>
                    <a href="">Обработка персональных данных</a>
                    <a href="">Политика конфиденциальности</a>
                    <a href="">Информация для потребителей</a>
                </div>

                <div class = "FooterContainer">
                    <b>Услуги</b>
                    <a href="">Доставка</a>
                    <a href="">Возврат товара</a>
                </div>

                <div class = "FooterContainer">
                    <b>Магазин</b>
                    <a href="">Справка</a>
                    <a href="">Категории</a>
                    <a href="">Избранное</a>
                    <a href="">Корзина</a>
                    <a href="">Аккаунт</a>
                </div>

                <div class = "FooterContainer">
                    <b>Рассылка</b>
                    <h style = {{lineHeight: "30px"}}>Подписываясь на рассылку, я даю согласие на обработку персональных данных и на получение рекламных сообщений и новостей о товарах и услугах.</h>
                    <div style = {{fontFamily: "Raleway", backgroundColor: "#0A5954", marginTop: "10px"}} class = "MainButton" id = "SubscribeButton">Подписаться</div>
                </div>
            </div>
            <p style={{marginBottom: "20px"}} class = "FooterCopyright">2024 © ООО «Reinterio». Все права защищены</p>
        </div> 
    
    </div>

        </footer>
    )
};