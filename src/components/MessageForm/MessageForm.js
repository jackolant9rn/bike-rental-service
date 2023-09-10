import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { addmessage } from "../../store/slice/messages/messages";
import { instance, instanceAuth } from "../../utils/axios/axios";
import { CLIENT_ID } from "../../utils/clientID/clientID";
import { useAuth } from "../../utils/useAuth/useAuth";
import './MessageForm.css';

function MessageForm() {
    
    const date = new Date()

    const auth = useAuth()

    const { officers } = useSelector((state) => state.officers)

    const appOfficers = officers.filter(officer => officer.approved)

    const dispatch = useDispatch()

    const [values, setValues] = useState({
        status: 'new',
        licenseNumber: '',
        ownerFullName: '',
        type: '',
        clientId: CLIENT_ID,
        color: '',
        date: '',
        officer: '',
        description: '',
    })

    const handleChange = e => {
        const fieldName = e.target.name
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const dateChange = e => {
        const newDate = new Date(e.target.value)
        setValues({...values, [e.target.name]: newDate})
    }

    const addMessage = (obj) => {
        if(!auth) {
            try {
                 instance.post('public/report', obj)
                    .then(response => dispatch(addmessage(response.data.data)))
            } catch (e) {
                console.log(e.response.data.message)
            }
        } else {
            try {
                 instanceAuth.post('cases', obj)
                    .then(response => dispatch(addmessage(response.data.data)))
            } catch (e) {
                console.log(e.response.data.message)
            }
        }
    }

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();
        addMessage(values);
        if (auth) {
            navigate("/cases")
        } else {
            navigate("/")
        }      
    }

    return (
        <form className="message_form" onSubmit={handleSubmit}>
            <div className="message_form_item">
                <label htmlFor="licenseNumber" className="message_form_label">Номер лицензии:</label>
                <input required type='text' name="licenseNumber" id="licenseNumber" className="message_form_input" onChange={handleChange} />
            </div>
            <div className="message_form_item">
                <label htmlFor="ownerFullName" className="message_form_label">ФИО клиента:</label>
                <input required type='text' name="ownerFullName" id="ownerFullName" className="message_form_input" onChange={handleChange} />
            </div>
            <div className="message_form_item">
                <label htmlFor="type" className="message_form_label">Тип велосипеда:</label>
                <select required name="type" id="type" className="message_form_select" value={values.type} onChange={handleChange}>
                    <option value={''}>--</option>
                    <option value={'general'}>General</option>
                    <option value={'sport'}>Sport</option>
                </select>
            </div>
            <div className="message_form_item">
                <label htmlFor="color" className="message_form_label">Цвет велосипеда:</label>
                <input type='text' name="color" id="color" className="message_form_input" onChange={handleChange} />
            </div>
            <div className="message_form_item">
                <label htmlFor="date" className="message_form_label">Дата кражи:</label>
                <input type='date' name="date" id="date" className="message_form_input"
                    max={date.toISOString().slice(0, 10)} onChange={dateChange} />
            </div>
            {auth && <div className="message_form_item">
                <label htmlFor="officer" className="message_form_label">Одобренные сотрудники:</label>
                <select name="officer" id="officer" className="message_form_select" value={values.officer} onChange={handleChange}>
                    <option value={''}>--</option>
                    {appOfficers.map(officer =>{
                        return (
                            <option value={officer._id} key={officer._id}>{officer.firstName} {officer.lastName}</option>
                        )
                    })}
                </select>
            </div>}
            <div className="message_form_item">
                <label htmlFor="description" className="message_form_label">Дополнительная информация:</label>
                <textarea name="description" id="description" className="message_form_textarea" onChange={handleChange} />
            </div>
            <button className="btn btn_submit-message" type="submit">Отправить</button>
        </form>
    )
}

export default MessageForm