import React from "react";
import './AuthMenu.css';
import LinkButton from "../LinkButton/LinkButton";

function AuthMenu() {
    return (
        <div className='auth'>
            <LinkButton path="auth/sign_up" selector="btn_auth" text="Регистрация" />
            <LinkButton path="auth/sign_in" selector="btn_auth" text="Войти" />
        </div>
    )
}

export default AuthMenu