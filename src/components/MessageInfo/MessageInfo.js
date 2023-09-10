import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { editmessage, getmessage } from "../../store/slice/message/message";
import { instanceAuth } from "../../utils/axios/axios";
import './MessageInfo.css'
import MessageEditor from "../MessageEditor/MessageEditor";
import LinkButton from "../LinkButton/LinkButton";

function MessageInfo() {

    const [load, setLoad] = useState(true)

    const [edit, setEdit] = useState(false)

    const [form, setForm] = useState(false)

    const { id } = useParams()

    const dispatch = useDispatch()

    const { message } = useSelector((state) => state.message)

    const { officers } = useSelector((state) => state.officers)

    const [resol, setResol] = useState({
        resolution: message.resolution
    })

    const [status, setStatus] = useState({
        status: message.status
    })

    const officerName = officers.find(officer => officer._id === message.officer)

    useEffect(() => {
        instanceAuth.get(`cases/${id}`)
            .then(response => {
                dispatch(getmessage(response.data.data))
            })
    }, [])

    setTimeout(() => {
        setLoad(false)
    }, 1000)

    const editMessage = (obj) => {
        instanceAuth.put(`cases/${id}`, obj)
            .then(response => dispatch(editmessage(response.data.data)))
    }

    const resolutionChange = e => {
        const fieldName = e.target.name
        setResol({ ...resol, [fieldName]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editMessage(resol)
        setForm(false)
    }

    const doneClick = () => {
        setStatus({ ...status, status: 'done' })
        editMessage(status);
    }

    return (
        <>
            {load && <div className="load">
                <div className="load_img"></div>
                <p className="load_text">Подождите, идёт загрузка...</p>
            </div>}
            {!load && <div className={`message_info ${message.status === 'done' ? 'done' : ''}`}>
                <h2 className="message_title">Лицензия №: {message.licenseNumber}</h2>
                <h3 className="message_owner_full_name">ФИО клиента: <br /> {message.ownerFullName}</h3>
                <p className="message_text">Дата кражи: {message.date.slice(0, 10)}</p>
                <p className="message_text">Тип велосипеда: {message.type}</p>
                <p className="message_text">Цвет велосипеда: {message.color}</p>
                <p className="message_text">Ответственный сотрудник: {officerName ? `${officerName.firstName} ${officerName.lastName}` : `--`}</p>
                <p className="message_text">Дополнительная информация: <br />
                    {message.description || `Информация отсутствует`}</p>
                {message.resolution && <p className="message_resolution"> {message.resolution}</p>}
                {form && <form className="resolution_form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Завершающий комментарий" className="resolution_input"
                        name="resolution" id="resolution" onChange={resolutionChange} />
                    <button className="btn btn_resolution" >ОК</button>
                </form>}
                <div className={`message_btns ${message.status === 'done' ? 'hidden' : ''}`}>
                    <button className="btn btn_edit_message" onClick={() => setEdit(true)}>Редактировать</button>
                    <button className="btn btn_edit_message" onClick={() => setForm(true)} disabled={message.resolution ? 'disabled' : ''}>Принять в обработку</button>
                    <button className="btn btn_done" onClick={doneClick} disabled={!message.resolution ? 'disabled' : ''}>Завершить</button>
                </div>
                <div className="message_dates">
                    <p className="message_date">Созданно: <br />
                        {message.createdAt.slice(0, 10)}</p>
                    <p className="message_date">Обновлено: <br />
                        {message.updatedAt ? message.updatedAt.slice(0, 10) : `--`}</p>
                </div>
                <LinkButton path="/cases" selector="btn_auth" text="Вернуться к списку" />
            </div>}
            {edit && <MessageEditor message={message} editMessage={editMessage} setEdit={setEdit} />}
        </>
    )
}

export default MessageInfo