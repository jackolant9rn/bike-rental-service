import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/useAuth/useAuth";
import AuthMenu from "../AuthMenu/AuthMenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import './Header.css';

function Header(props) {
    const auth = useAuth()
    const { user } = useSelector((state) => state.auth)

    return (
        <header className='header' >
            <NavLink to='/' className='logo'>
                <div className='logo_img'></div>
                <h1 className='title'>Bike rental service</h1>
            </NavLink>
            {auth && <nav className='nav'>
                <NavLink to='/' className='nav_item'>Главная</NavLink>
                <NavLink to='cases' className='nav_item'>Сообщения о кражах</NavLink>
                <NavLink to='officers' className='nav_item'>Ответственные сотрудники</NavLink>
            </nav>}
            {!auth && <AuthMenu />}
            {auth && <ProfileMenu user={user.data} logOut={props.logOut} />}
        </header>
    )
}

export default Header