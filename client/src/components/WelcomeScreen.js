import React from "react";

export default function WelcomeScreen(){
    return(
        <div class = "Welcome">
            <div class = "WelcomeInfo">
                <h1 className="ReinterioTitle"><h style = {{color: "#0A5954"}}>Re</h>interio</h1>
                <p class = "ReinterioText" >Современная мебель для <em>красивого</em> дома по уникальным проектам профессиональных дизайнеров</p>
                
                <div style = {{display: "flex", flexDirection: "row", gap: "15px"}}>
                <a href='/catalogue'><div class = "MainButton"><p class = "Text">Каталог</p></div></a>
                    <div style = {{backgroundColor: "#0A5954"}} class = "MainButton"><p class = "Text">Категории</p></div>
                </div>
            </div>

            <div class = "WelcomeImages">
                <div style = {{display: "flex", flexDirection: "column", gap: "15px"}}>
                    <img id = "WelcomeImage1" class = "WelcomeImage" src="img/WelcomeReinterio1.png" alt=""></img>
                    <img id = "WelcomeImage1" class = "WelcomeImage" src="img/WelcomeReinterio2.png" alt=""></img>
                </div>
                    <img class = "WelcomeImage" src="img/WelcomeReinterio3.png" alt=""></img>
            </div>
        </div>
    )
};