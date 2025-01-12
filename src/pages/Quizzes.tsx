import React, { useEffect } from "react";

import Header from "../components/Header";

import QuizTile from '../components/Quiz-Tile';

import Footer from "../components/Footer";

import '../css/Quizzes.css';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllQuizzes } from "../app/quizzesSlice";

const Quizzes = () => {
    
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.quizzes)

    useEffect(() => {
        dispatch(getAllQuizzes());
    }, [dispatch]);

    document.title = "Quizzes - QuizIt";

    if (state.status === "error") {
        return (
            <div id="quizzes">
                <Header />
                <div id="quizzes-container">
                    <h1>Error: {state.error}</h1>
                </div>
                <Footer />
            </div>
        );
    } else if (state.status === "loading") {
        return (
            <div id="quizzes">
                <Header />
                <div id="quizzes-container">
                    <h1>Loading...</h1>
                </div>
                <Footer />
            </div>
        );
    } else {
        return (
            <div id="quizzes">
                <Header />
                <div id="quizzes-container">
                    { Object.entries(state.quizzes).map(([_, value], i) => <QuizTile key={i} quizData={value}/>) }
                </div>
                <Footer />
            </div>
        );
    }
}

export default Quizzes;