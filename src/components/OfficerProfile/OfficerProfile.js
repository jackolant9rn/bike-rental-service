import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { editofficer, getofficer } from "../../store/slice/officer/officer";
import { instanceAuth } from "../../utils/axios/axios";
import ProfileEditor from "../ProfileEditor/ProfileEditor";
import './OfficerProfile.css'

function OfficerProfile() {

    const [visible, setVisible] = useState(false)

    const { id } = useParams()

    const dispatch = useDispatch()

    const editOfficer = (obj) => {
         instanceAuth.put(`officers/${id}`, obj)
            .then(response => dispatch(editofficer(response.data.data)))

    }

    useEffect(() => {
        instanceAuth.get(`officers/${id}`)
            .then(response => dispatch(getofficer(response.data.data)))
    }, [])

    const { officer } = useSelector((state) => state.officer)

    return (
        <div className="profile">
            <h3 className="profile_title">Профиль сотрудника</h3>
                <p className="profile_text">{`Имя: ${officer.firstName ? officer.firstName : `--`}`}</p>
                <p className="profile_text">{`Фамилия: ${officer.lastName ? officer.lastName : `--`}`}</p>
                <p className="profile_text">{`Email: ${officer.email}`}</p>
                <p className="profile_text">{officer.approved ? `Одобренный сотрудник` : `Сотрудник`}</p>
            <button className="btn btn_profile" onClick={() => setVisible(true)}>Редактировать сотрудника</button>
            {visible && <ProfileEditor setVisible={setVisible} officer={officer} editOfficer={editOfficer} />}
        </div>
    )
}

export default OfficerProfile