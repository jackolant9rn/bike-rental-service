import React, { useState } from "react";
import { CLIENT_ID } from "../../utils/clientID/clientID";
import { useAuth } from "../../utils/useAuth/useAuth";
import './SignUpForm.css';

function SignUpForm(props) {

    const auth = useAuth()

    const [values, setValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        clientId: '',
        approved: false
    })

    const [required, setRequired] = useState(false)


    const handleChange = e => {
        const fieldName = e.target.name
        if (!auth) {
            if (values.clientId === CLIENT_ID) {
                setValues({ ...values, [fieldName]: e.target.value, approved: true })
            } else {
                setValues({ ...values, [fieldName]: e.target.value, approved: false })
            }
        } else {
            setValues({ ...values, [fieldName]: e.target.value })
        }

        if ({ [fieldName]: e.target.value }) {
            setRequired(false)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!auth) {
            if (values.email && values.password && values.clientId) {
                props.regSubmit(values)
            } else {
                setRequired(true)
            }
        } else {
            if (values.email && values.password) {
                props.addOfficer(values)
            } else {
                setRequired(true)
            }
        }
        e.target.reset()
    }

    const checkboxChange = e => {
        setValues({ ...values, [e.target.name]: !values.approved })
    }

    return (
        <>
            <form className="signup" onSubmit={handleSubmit}>
                <div className="signup_item">
                    <label htmlFor="email" className="signup_label">Email:</label>
                    <input type='email' name="email" id="email" className={`signup_input ${required && 'error'}`} onChange={handleChange} />
                </div>
                <div className="signup_item">
                    <label htmlFor="password" className="signup_label">Пароль:</label>
                    <input type='password' name="password" id="password" className={`signup_input ${required && 'error'}`} onChange={handleChange} />
                </div>
                {!auth && <div className="signup_item">
                    <label htmlFor="clientId" className="signup_label">clientId:</label>
                    <input type='text' name="clientId" id="clientId" className={`signup_input ${required && 'error'}`} onChange={handleChange} />
                </div>}
                <div className="signup_item">
                    <label htmlFor="firstName" className="signup_label">Имя:</label>
                    <input type='text' name="firstName" id="firstName" className={`signup_input`} onChange={handleChange} />
                </div>
                <div className="signup_item">
                    <label htmlFor="lastName" className="signup_label">Фамилия:</label>
                    <input type='text' name="lastName" id="lastName" className={`signup_input`} onChange={handleChange} />
                </div>
                {auth && <div className="signup_item checkbox_container">
                    <label htmlFor="approved" className="signup_label">Одобренный сотрудник</label>
                    <input type='checkbox' name="approved" id="approved" className={`signup_checkbox`} onChange={checkboxChange} />
                </div>}
                {required &&
                    <div className="required">
                        <p>Заполните обязательные поля</p>
                    </div>}
                <button className="btn btn_submit" type="submit">{props.textBtn}</button>
                {auth && <button className="btn btn_close" onClick={props.visibleForm}>Отмена</button>}
            </form>
        </>
    )
}

export default SignUpForm