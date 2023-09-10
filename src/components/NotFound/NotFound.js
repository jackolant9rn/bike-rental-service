import React from "react";
import LinkButton from "../LinkButton/LinkButton";
import './NotFound.css'

function NotFound() {
    return(
        <div className="not-found">
            <h1 className>Страница не найдена</h1>
            <LinkButton path="/" selector="btn_message" text="Вернуться на главную" />
        </div>
    )
}

export default NotFound