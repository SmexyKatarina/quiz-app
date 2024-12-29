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
        console.log("Into Authing");
        const user = await fetch(`http://localhost:3001/users/getUser/${username}`)
            .then(res => res.json());
        if (user.error) {
            return rejectWithValue(user.error);
        } else {
            console.log("User info retrieved");
            console.log(user);
            return user[0].username;
        }
        // CHECK USER
        /*
        else if (user password incorrect) {
            return rejectWithValue("Incorrect password.");
        } else (user password correct) {
            return username; 
        }
        */
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
