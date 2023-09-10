import React from "react";
import './NotAuth.css'
import LinkButton from "../LinkButton/LinkButton";


function NotAuth() {
    return (
        <>
            <div className="not-auth">
                <h1>Вы не авторизованны</h1>
                <LinkButton path="/" selector="btn_message" text="Вернуться на главную" />
            </div>
        </>
    )
}

export default NotAuth