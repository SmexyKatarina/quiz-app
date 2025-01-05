import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../app/createAppSlice";

export interface UserState {
    username: string,
    authenticated: boolean
    status: "idle" | "loading" | "error",
    error: any
}

const initialState: UserState = {
    username: "admin",
    authenticated: true,
    status: "idle",
    error: ""  
}
/* const initialState: UserState = {
    username: "",
    authenticated: false,
    status: "idle",
    error: ""  
} */

export const authenticateUser = createAsyncThunk(
    "users/authenticateUser",
    async ({username, password}: { username: string, password: string}, { rejectWithValue }) => {
        const user = await fetch(`http://localhost:3001/users/getUser/`, { headers: { "Authorization": `Basic ${btoa(`${username}:${password}`)}` }})
            .then(res => res.json());
        if (user.error) {
            return rejectWithValue(user.error);
        } else {
            return user[0].username;
        }
    }
);

export const createUser = createAsyncThunk(
    "users/createUser",
    async ({username, password}: { username: string, password: string}, { rejectWithValue }) => {
        const userObj = { username: username, password: password };
        const users = await fetch(`http://localhost:3001/users/getUsers/`)
            .then(res => res.json());
        if (users.error) {
            return rejectWithValue(users.error);
        } else if (users.usernames.includes(username)) {
            return rejectWithValue("Username already exists");
        } else {
            const post = await fetch(`http://localhost:3001/users/createUser`, { 
                method: "POST", body: JSON.stringify(userObj)
            }).then(res => res.json());
            if (post.ok) {
                return username;
            } else {
                return rejectWithValue(post.error);
            }
        }
    }
);

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
        });
        builder.addCase(createUser.fulfilled, (state: UserState, action) => {
            state.status = "idle";
            state.username = action.payload;
            state.authenticated = true;
        })
        .addCase(createUser.rejected, (state: UserState, action) => {
            state.status = "error";
            state.error = action.payload;
        })
        .addCase(createUser.pending, (state: UserState) => {
            state.status = "loading";
        });
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
