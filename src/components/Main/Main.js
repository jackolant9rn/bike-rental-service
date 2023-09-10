import React from "react";
import { Route, Routes } from "react-router-dom";
import MessageForm from "../MessageForm/MessageForm";
import Home from "../Home/Home";
import MessageInfo from "../MessageInfo/MessageInfo";
import Messages from "../Messages/Messages";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import OfficerProfile from "../OfficerProfile/OfficerProfile";
import './Main.css'
import MyProfile from "../MyProfile/MyProfile";
import Officers from "../Officers/Officers";
import { useAuth } from "../../utils/useAuth/useAuth";
import NotAuth from "../NotAuth/NotAuth";
import NotFound from "../NotFound/NotFound";

function Main(props) {

    const auth = useAuth()

    const { regSubmit, authSubmit, user } = props

    return (
        <main className='main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='cases' element={auth ? <Messages /> : <NotAuth />} />
                <Route path="officers" element={auth ? <Officers /> : <NotAuth />} />
                <Route path="auth/sign_up" element={<SignUpForm regSubmit={regSubmit} textBtn="Зарегистрироваться" />} />
                <Route path="auth/sign_in" element={<SignInForm authSubmit={authSubmit} />} />
                <Route path="cases/submit" element={<MessageForm />} />
                <Route path="/officers/:id" element={auth ? <OfficerProfile /> : <NotAuth />} />
                <Route path="/cases/:id" element={auth ? <MessageInfo /> : <NotAuth />} />
                <Route path="my_profile" element={auth ? <MyProfile user={user} /> : <NotAuth />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default Main