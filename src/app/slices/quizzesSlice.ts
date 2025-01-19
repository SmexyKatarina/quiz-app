import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../hooks/createAppSlice";
import { API } from "../../bin/extras";

export type QuizState = {
    quizzes: { [id: number]: { quiz_name: string, quiz_category: number, username: string }}
    status: "idle" | "loading" | "error"
    activeQuiz: ActiveQuiz
    error: any
}

export type ActiveQuiz = {
    quiz_id: number
    quiz_name: string
    questions: { [question_id: number]: { question: string, answer_type: string, possibleAnswers?: string[] }}
}

const initialState: QuizState = {
    quizzes: {},
    status: "idle",
    activeQuiz: {
        quiz_id: -1,
        quiz_name: "",
        questions: {}
    },
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

export const getQuizData = createAsyncThunk(
    "quizzes/getQuizData",
    async (quiz_id: number, { rejectWithValue }) => {
        const json = await API(`quizzes/getQuiz/${quiz_id}`);
        if (json.error) {
            return rejectWithValue(json.error);
        } else {
            return json;
        }
    }
)

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

        builder.addCase(getQuizData.fulfilled, (state: QuizState, action) => {

        })
    }
});

export default quizSlice.reducer;
