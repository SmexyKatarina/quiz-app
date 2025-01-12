import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice';
import quizzesReducer from './quizzesSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        quizzes: quizzesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;