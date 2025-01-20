import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

const errorReducer = (state: QuizState, action: any) => {
    state.error = action.payload.error;
    state.status = "error";
}

const pendingReducer = (state: QuizState) => {
    state.status = "loading";
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
            return json.quiz;
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
        .addCase(getAllQuizzes.rejected, errorReducer)
        .addCase(getAllQuizzes.pending, pendingReducer)

        builder.addCase(getQuizData.fulfilled, (state: QuizState, {payload}: PayloadAction<ActiveQuiz>) => {
            state.activeQuiz = payload;
            state.status = "idle";
        })
        .addCase(getQuizData.rejected, errorReducer)
        .addCase(getQuizData.pending, pendingReducer);
    }
});

export default quizSlice.reducer;
