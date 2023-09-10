import React, { useState } from "react";
import './MessageEditor.css'
import { useSelector } from "react-redux";

function MessageEditor(props) {

    const { message, editMessage, setEdit } = props

    const { officers } = useSelector((state) => state.officers)

    const appOfficers = officers.filter(officer => officer.approved)

    const [values, setValues] = useState({
        licenseNumber: message.licenseNumber,
        ownerFullName: message.ownerFullName,
        type: message.type,
        color: message.color,
        date: new Date(message.date),
        officer: message.officer,
        description: message.description,
    })

    const handleChange = e => {
        const fieldName = e.target.name
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const dateChange = e => {
        const newDate = new Date(e.target.value)
        setValues({ ...values, [e.target.name]: newDate })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editMessage(values)
        setEdit(false)
    }

    return (
        <div className="editor">
            <form className="message_form_editor" onSubmit={handleSubmit}>
                <div className="message_form_item">
                    <label htmlFor="licenseNumber" className="message_form_label">Номер лицензии:</label>
                    <input type='text' name="licenseNumber" id="licenseNumber" className="message_form_input" value={values.licenseNumber} onChange={handleChange} />
                </div>
                <div className="message_form_item">
                    <label htmlFor="ownerFullName" className="message_form_label">ФИО клиента:</label>
                    <input type='text' name="ownerFullName" id="ownerFullName" className="message_form_input" value={values.ownerFullName} onChange={handleChange} />
                </div>
                <div className="message_form_item">
                    <label htmlFor="type" className="message_form_label">Тип велосипеда:</label>
                    <select name="type" id="type" className="message_form_select" value={values.type} onChange={handleChange}>
                        <option value={''}>--</option>
                        <option value={'general'}>General</option>
                        <option value={'sport'}>Sport</option>
                    </select>
                </div>
                <div className="message_form_item">
                    <label htmlFor="color" className="message_form_label">Цвет велосипеда:</label>
                    <input type='text' name="color" id="color" className="message_form_input" value={values.color} onChange={handleChange} />
                </div>
                <div className="message_form_item">
                    <label htmlFor="date" className="message_form_label">Дата кражи:</label>
                    <input type='date' name="date" id="date" className="message_form_input"
                        value={values.date.toISOString().slice(0, 10)} max={values.date.toISOString().slice(0, 10)} onChange={dateChange} />
                </div>
                <div className="message_form_item">
                    <label htmlFor="officer" className="message_form_label">Одобренные сотрудники:</label>
                    <select name="officer" id="officer" className="message_form_select" value={values.officer} onChange={handleChange}>
                        <option value={''}>--</option>
                        {appOfficers.map(officer => {
                            return (
                                <option value={officer._id} key={officer._id}>{officer.firstName} {officer.lastName}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="message_form_item description">
                    <label htmlFor="description" className="message_form_label">Дополнительная информация:</label>
                    <textarea name="description" id="description" className="message_form_textarea" value={values.description} onChange={handleChange} />
                </div>
                <button className="btn btn_submit-message" type="submit">Редактировать</button>
            </form>
        </div>
    )
}

export default MessageEditor