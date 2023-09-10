import React from "react";
import LinkButton from "../LinkButton/LinkButton";
import './Home.css'

function Home() {
    return (
            <div className="home">
                <div className="home_img"></div>
                <div className="container">
                    <h1 className="home_title">
                        Добро пожаловать!
                    </h1>
                    <p className="home_text">
                        Данный сервис предназначен для учёта и отслеживания прогресса в расследовании
                        случаев кражи имущества компании по прокату велосипедов в крупных городах России
                    </p>
                    <LinkButton path="cases/submit" selector="btn_message" text="Сообщить о краже" />
                </div>
            </div>
    )
}

export default Home