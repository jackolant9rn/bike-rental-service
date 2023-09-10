import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth/auth";
import messageSlice from "./slice/message/message";
import messagesSlice from "./slice/messages/messages";
import officerSlice from "./slice/officer/officer";
import officersSlice from "./slice/officers/officers";


const store = configureStore({
    reducer: {
        auth: authSlice,
        officers: officersSlice,
        officer: officerSlice,
        messages: messagesSlice,
        message: messageSlice
    }
})

export default store