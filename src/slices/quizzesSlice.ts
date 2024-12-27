import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../app/createAppSlice";

export interface QuizState {
    quizzes: {}[],
    status: "idle" | "loading" | "error",
    error: any
}

const initialState: QuizState = {
    quizzes: [],
    status: "idle",
    error: ""
}

export const getAllQuizzes = createAsyncThunk(
    "quizzes/getAllQuizzes",
    async (_, { rejectWithValue }) => {
        const json = await fetch("http://localhost:3001/quizzes")
            .then(res => res.json());
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
