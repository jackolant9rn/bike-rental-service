import React from "react";
import './ProfileMenu.css'
import { Link } from "react-router-dom";

function ProfileMenu(props) {

    const { user, logOut } = props

    return (
        <div className="profile-menu">
            <Link to={'/my_profile'} className="profile-menu_user">
                <span className="profile-menu_name">{user.user.firstName} {user.user.lastName}</span>
                <div className="profile-menu_img"></div>
            </Link>
            <button className="btn btn_profile-menu" onClick={logOut}>Выйти</button>
        </div>
    )
}

export default ProfileMenu