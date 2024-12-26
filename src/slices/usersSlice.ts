import { createAppSlice } from "../app/createAppSlice";

export interface UserState {
    username: string,
    authenticated: boolean
    status: "idle" | "loading" | "error"
}

const initialState: UserState = {
    username: "",
    authenticated: false,
    status: "idle"   
}

export const userSlice = createAppSlice({
    name: "users",
    initialState,
    reducers: create => ({
        authenicateUser: create.asyncThunk(async (user: { username: string, password: string }) => {
            return user;
        }, {
            pending: state => { state.status = "loading" },
            fulfilled: (state, { payload }) => { state.status = "idle"; state.authenticated = true; state.username = payload.username; },
            rejected: state => { state.status = "error"}
        }),
    })
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
