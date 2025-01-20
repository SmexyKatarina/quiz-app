"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizSlice = exports.getQuizData = exports.getAllQuizzes = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createAppSlice_1 = require("../hooks/createAppSlice");
const extras_1 = require("../../bin/extras");
const initialState = {
    quizzes: {},
    status: "idle",
    activeQuiz: {
        quiz_id: -1,
        quiz_name: "",
        questions: {}
    },
    error: ""
};
const errorReducer = (state, action) => {
    state.error = action.payload.error;
    state.status = "error";
};
const pendingReducer = (state) => {
    state.status = "loading";
};
exports.getAllQuizzes = (0, toolkit_1.createAsyncThunk)("quizzes/getAllQuizzes", async (_, { rejectWithValue }) => {
    const json = await (0, extras_1.API)("quizzes");
    if (json.error) {
        return rejectWithValue(json.error);
    }
    else {
        return json;
    }
});
exports.getQuizData = (0, toolkit_1.createAsyncThunk)("quizzes/getQuizData", async (quiz_id, { rejectWithValue }) => {
    const json = await (0, extras_1.API)(`quizzes/getQuiz/${quiz_id}`);
    if (json.error) {
        return rejectWithValue(json.error);
    }
    else {
        return json.quiz;
    }
});
exports.quizSlice = (0, createAppSlice_1.createAppSlice)({
    name: "quizzes",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(exports.getAllQuizzes.fulfilled, (state, action) => {
            state.quizzes = action.payload;
            state.status = "idle";
        })
            .addCase(exports.getAllQuizzes.rejected, errorReducer)
            .addCase(exports.getAllQuizzes.pending, pendingReducer);
        builder.addCase(exports.getQuizData.fulfilled, (state, { payload }) => {
            state.activeQuiz = payload;
            state.status = "idle";
        })
            .addCase(exports.getQuizData.rejected, errorReducer)
            .addCase(exports.getQuizData.pending, pendingReducer);
    }
});
exports.default = exports.quizSlice.reducer;
