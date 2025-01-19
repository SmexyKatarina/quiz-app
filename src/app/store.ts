import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/usersSlice';
import quizzesReducer from './slices/quizzesSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        quizzes: quizzesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;