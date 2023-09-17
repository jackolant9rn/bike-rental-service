import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allmessages, removemessage } from "../../store/slice/messages/messages";
import { instanceAuth } from "../../utils/axios/axios";
import Message from "../Message/Message";
import LinkButton from "../LinkButton/LinkButton";
import './Messages.css'

function Messages() {

    const dispatch = useDispatch()

    useEffect(() => {
        instanceAuth.get('cases')
            .then(response => dispatch(allmessages(response.data.data)))
    }, [])

    const removeMessage = (id) => {
         instanceAuth.delete(`cases/${id}`)
        .then(() => {
            dispatch(removemessage(id))
        })
    }

    const { messages } = useSelector((state) => state.messages)

    return (
        <div className="messages">
            {messages.map(message => {
                return (
                    <Message key={message._id} message={message} removeMessage={removeMessage} />
                )
            })}
            <LinkButton path="submit" selector="btn_message" text="Создать сообщение" />
        </div>
    )
}

export default Messages