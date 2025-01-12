import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "./createAppSlice";
import { API } from "../bin/extras";

export interface QuizState {
    quizzes: { [propName: number]: { quiz_name: string, quiz_category: number, username: string }},
    status: "idle" | "loading" | "error",
    error: any
}

const initialState: QuizState = {
    quizzes: {},
    status: "idle",
    error: ""
}

export const getAllQuizzes = createAsyncThunk(
    "quizzes/getAllQuizzes",
    async (_, { rejectWithValue }) => {
        const json = await API("quizzes");
        if (json.error) {
            return rejectWithValue(json.error);
        } else {
            return json;
        }
    }
);

export const quizSlice = createAppSlice({
    name: "quizzes",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllQuizzes.fulfilled, (state: QuizState, action) => {
            state.quizzes = action.payload;
            state.status = "idle";
        })
        .addCase(getAllQuizzes.rejected, (state: QuizState, action) => {
            state.error = action.payload;
            state.status = "error";
        })
        .addCase(getAllQuizzes.pending, (state: QuizState) => {
            state.status = "loading";
        })
    }
});

export default quizSlice.reducer;
