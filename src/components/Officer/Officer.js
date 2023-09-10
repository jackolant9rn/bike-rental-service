import React from "react";
import { Link } from "react-router-dom";
import './Officer.css'
import { useSelector } from "react-redux";

function Officer(props) {
    const { officer, removeOfficer, disabled } = props

    const { user } = useSelector(state => state.auth)

    const handleRemove = () => {
        removeOfficer(officer._id)
    }

    return (
        <div className="user">
            <Link to={`${officer._id === user.data.user.id
                ? `/my_profile`
                : `/officers/${officer._id}`} `} className='user_name'>
                {officer.firstName && officer.lastName
                ? `${officer.firstName} ${officer.lastName}` 
                : `${officer.email}`}
            </Link>
            <button className="btn btn_delete" onClick={handleRemove} disabled={disabled}>Удалить</button>
        </div>
    )
}

export default Officer