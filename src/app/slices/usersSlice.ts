import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../hooks/createAppSlice";
import { API } from "../../bin/extras";

export type UserState = {
    username: string
    authenticated: boolean
    status: "idle" | "loading" | "error"
    error: any
    permissions: string[]
}

const initialState: UserState = {
    username: "admin",
    authenticated: true,
    status: "idle",
    error: "",
    permissions: ["ALL"]
}
/* const initialState: UserState = {
    username: "",
    authenticated: false,
    status: "idle",
    error: ""  
} */

const errorReducer = (state: UserState, action: any) => {
    state.error = action.payload.error;
    state.status = "error";
}

const pendingReducer = (state: UserState, action: any) => {
    state.status = "loading";
}

export const authenticateUser = createAsyncThunk(
    "users/authenticateUser",
    async ({username, password}: { username: string, password: string }, { rejectWithValue }) => {
        const user = await API(`users/authUser/`, { headers: { "Authorization": `Basic ${btoa(`${username}:${password}`)}` }});
        if (user.error) {
            return rejectWithValue(user.error);
        } else {
            return { username: user[0].username, permissions: user[0].permissions.split(",")};
        }
    }
);

export const createUser = createAsyncThunk(
    "users/createUser",
    async ({username, password}: { username: string, password: string }, { rejectWithValue }) => {
        const userObj = { username: username, password: password };
        const users = await API(`users/getUsers`);
        if (users.error) {
            return rejectWithValue(users.error);
        } else if (users.usernames.includes(username)) {
            return rejectWithValue("Username already exists");
        } else {
            const post = await API(`users/createUser`, { 
                method: "POST", body: JSON.stringify(userObj), headers: {
                    "Content-Type": "application/json"
                }
            });
            if (post.ok) {
                return username;
            } else {
                return rejectWithValue(post.error);
            }
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async ({ username }: { username: string }, { rejectWithValue }) => {
        const deleted = await API(`users/deleteUser/${username}`);
        if (deleted.error) {
            return rejectWithValue(deleted.error);
        } else {
            return true;
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

        // AUTHENTICATE USER
        builder.addCase(authenticateUser.fulfilled, (state: UserState, action: PayloadAction<{ username: string, permissions: string[] }>) => {
            state.username = action.payload.username;
            state.permissions = action.payload.permissions;
            state.status = "idle";
            state.authenticated = true;
        })
        .addCase(authenticateUser.rejected, errorReducer)
        .addCase(authenticateUser.pending, pendingReducer);

        // CREATE USER
        builder.addCase(createUser.fulfilled, (state: UserState, action) => {
            state.status = "idle";
            state.username = action.payload;
            state.authenticated = true;
        })
        .addCase(createUser.rejected, errorReducer)
        .addCase(createUser.pending, pendingReducer);

        // DELETE USER 
        builder.addCase(deleteUser.fulfilled, (state: UserState) => {
            state.authenticated = false;
            state.username = "";
            state.status = "idle";
        })
        .addCase(deleteUser.rejected, errorReducer)
        .addCase(deleteUser.pending, pendingReducer)
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
