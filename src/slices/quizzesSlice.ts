import { createAppSlice } from "../app/createAppSlice";

export interface QuizState {
    quizName: string,
    questions: number[],
    status: "idle" | "loading" | "error"
}

const initialState: QuizState = {
    quizName: "",
    questions: [],
    status: "idle"
}

export const quizSlice = createAppSlice({
    name: "quizzes",
    initialState,
    reducers: create => ({
        getQuiz: create.asyncThunk(async (quiz: { quizName: string, questions: number[] }) => {
            return quiz;
        }, {
            pending: state => { state.status = "loading" },
            fulfilled: (state, { payload }) => { state.status = "idle"; state.quizName = payload.quizName, state.questions = payload.questions},
            rejected: state => { state.status = "error" }
        }),
    })
});

export const userActions = quizSlice.actions;
export default quizSlice.reducer;
