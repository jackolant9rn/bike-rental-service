import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Message.css'
import { instanceAuth } from "../../utils/axios/axios";
import { useDispatch } from "react-redux";
import { editmessage } from "../../store/slice/message/message";


function Message(props) {

    const { message, removeMessage } = props

    const [status, setStatus] = useState({
        status: message.status
    })

    const dispatch = useDispatch()

    const handleRemove = () => {
        removeMessage(message._id)
    }

    const changeStatus = (id, obj) => {
        instanceAuth.put(`cases/${id}`, obj)
        .then(response => dispatch(editmessage(response.data.data)))
    }

    const handleClick = () => {
        setStatus(status.status = 'in_progress')
        changeStatus(message._id, status)
    }

    return (
        <div className={`message  ${message.status === 'new' ? 'new' : ''}`}>
            <Link to={`/cases/${message._id}`} className={`message_license ${message.status === 'done' ? 'done' : ''}`} onClick={message.status === 'new' ? handleClick : null}>Номер лицензии: {message.licenseNumber} <br />
                Дата кражи: {message.date.slice(0, 10)}</Link>
            <button className="btn btn_message_del" onClick={handleRemove} disabled={message.status === 'new' ? 'disabled' : ''} >Удалить</button>
        </div>
    )
}

export default Message