import { createAppSlice } from "../../app/createAppSlice";
import type { PayloadAction } from '@reduxjs/toolkit'; 

export interface UserState {
    username: string,
    authenticated: boolean
    status: "idle" | "loading" | "error"
}

const initialState = {
    username: "",
    authenticated: false,
    status: "idle"   
}

export const userSlice = createAppSlice({
    name: "users",
    initialState,
    reducers: create => ({
        authenicateUser: create.asyncThunk(async (user: { username: string, password: string }) => {
            // fetch data
            return "";
        }, {
            pending: state => { state.status = "loading" },
            fulfilled: state => { state.status = "idle"; state.authenticated = true; },
            rejected: state => { state.status = "error"}
            
        }),
    })
});