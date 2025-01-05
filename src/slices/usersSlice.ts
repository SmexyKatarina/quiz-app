import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../app/createAppSlice";

export interface UserState {
    username: string,
    authenticated: boolean
    status: "idle" | "loading" | "error",
    error: any
}

const initialState: UserState = {
    username: "",
    authenticated: false,
    status: "idle",
    error: ""  
}

export const authenticateUser = createAsyncThunk(
    "users/authenticateUser",
    async ({username, password}: { username: string, password: string}, { rejectWithValue }) => {
        const user = await fetch(`http://localhost:3001/users/getUser/`, { headers: { "Authorization": `Basic ${btoa(`${username}:${password}`)}` }})
            .then(res => res.json());
            console.log(user);
        if (user.error) {
            return rejectWithValue(user.error);
        } else {
            return user[0].username;
        }
    }
)

export const userSlice = createAppSlice({
    name: "users",
    initialState,
    reducers: {
        deauthenticateUser: (state) => {
            state.authenticated = false;
            state.username = "";
        }
    },
    extraReducers: builder => {
        builder.addCase(authenticateUser.fulfilled, (state: UserState, action) => {
            console.log(action.payload);
            state.username = action.payload;
            state.status = "idle";
            state.authenticated = true;
        })
        .addCase(authenticateUser.rejected, (state: UserState, action) => {
            state.status = "error";
            state.error = action.payload;
        })
        .addCase(authenticateUser.pending, (state: UserState) => {
            state.status = "loading";
        })
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
