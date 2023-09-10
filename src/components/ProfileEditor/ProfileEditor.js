import React, { useState } from "react";
import './ProfileEditor.css';

function ProfileEditor(props) {

    const { setVisible, officer, editOfficer } = props

    const [values, setValues] = useState(
        {
            firstName: officer.firstName,
            lastName: officer.lastName,
            approved: officer.approved
        }
    )

    const handleChange = e => {
        const fieldName = e.target.name
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const checkboxChange = e => {
        setValues({ ...values, [e.target.name]: !values.approved })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editOfficer(values)
        setVisible(false)
    }

    return (
        <div className="editor" onSubmit={handleSubmit}>
            <form className={`editor_form`}>
                <h3 className="editor_title">Редактировать сотрудника</h3>
                <div className="editor_item">
                    <label htmlFor="firstName" className="editor_label">Изменить имя:</label>
                    <input type="text" name="firstName" id="firstName" className="editor_input" value={values.firstName} onChange={handleChange} />
                </div>
                <div className="editor_item">
                    <label htmlFor="lastName" className="editor_label">Изменить Фамилию:</label>
                    <input type="text" name="lastName" id="lastName" className="editor_input" value={values.lastName} onChange={handleChange} />
                </div>
                <div className="editor_item">
                    <input type="checkbox" name="approved" id="approved" className="editor_checkbox" onChange={checkboxChange} checked={values.approved && 'checked'} />
                    <label htmlFor="approved" className="editor_label">Одобрить сотрудника</label>
                </div>
                <div className="btn_container">
                    <button className="btn btn_submit">Редактировать</button>
                    <button className="btn btn_cancel" onClick={() => setVisible(false)}>Отмена</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEditor