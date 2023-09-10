import React, {useState} from "react";
import './SignInForm.css';

function SignInForm(props) {

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const handleChange = e => {
        const fieldName = e.target.name
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (values.email && values.password) {
            props.authSubmit(values)
        }
    }

    return (
        <form className="signin" onSubmit={handleSubmit}>
            <div className="signin_item">
                <label htmlFor="email" className="signin_label">Email:</label>
                <input type='email' name="email" id="email" className="signin_input" onChange={handleChange} />
            </div>
            <div className="signin_item">
                <label htmlFor="password" className="signin_label">Пароль:</label>
                <input type='password' name="password" id="password" className="signin_input" onChange={handleChange} />
            </div>
            <button className="btn btn_submit" type="submit">Войти</button>
        </form>
    )
}

export default SignInForm