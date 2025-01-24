import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import QuizTile from '../components/Quiz-Tile';

import Footer from "../components/Footer";

import '../css/Quizzes.css';
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { getAllQuizzes } from "../app/slices/quizzesSlice";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
    
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.quizzes);

    const [selectedQuiz, setSelectedQuiz] = useState<{
        quiz_id: number
        quiz_name: string
        quiz_category: number
        username: string
        id: number
    }>({
        quiz_id: -1,
        quiz_name: "",
        quiz_category: -1,
        username: "",
        id: -1
    });

    useEffect(() => {
        dispatch(getAllQuizzes());
    }, [dispatch]);

    document.title = "Quizzes - QuizIt";

    const handleTileClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>, quiz_obj: {
        quiz_id: number
        quiz_name: string
        quiz_category: number
        username: string
        id: number
    }) => {
        setSelectedQuiz(prev => {
            if (prev.id === quiz_obj.id) {
                return {
                    quiz_id: -1,
                    quiz_name: "",
                    quiz_category: -1,
                    username: "",
                    id: -1
                }
            } else {
                return quiz_obj;
            }
        });
    }

    const getSelectedCss = (id: number) => {
        if (id === -1) return { 
            "maxHeight": "0", 
            "transition": "max-height 0s",
            "padding": "0",
            "borderWidth": "0",
            "boxShadow": "none"
        }; else return { 
            "maxHeight": "500px", 
            "transition": "max-height 1.5s linear",
            "padding": "20px",
            "borderWidth": "1px",
            "boxShadow": "10px 10px 20px 5px darkgray"
        }
    }

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
                <div id="quizzes-page-info">
                    <h1>Quizzes</h1>
                    <p>These are some of the quizzes that are created by various people. You can choose to do one of these or you may <span>create your own</span>.</p>
                </div>
                <div className="separator"/>
                <div id="selected-quiz" style={getSelectedCss(selectedQuiz.id)}>
                    <div className="selected-quiz-info">
                        <h2>{selectedQuiz.quiz_name}</h2>
                        <h4>Created By: {selectedQuiz.username}</h4>
                        <h4>Category: {selectedQuiz.quiz_category}</h4>
                    </div>
                    <div className="selected-statistics">
                        {/** Add some statistics for the quiz. Completion Rate? Average Grade if graded? # of questions? */}
                    </div>
                    <div className="selected-actions">
                        <button className="selected-complete" onClick={() => { navigate(`/quiz/${selectedQuiz.quiz_id}`); }}>Complete</button>
                    </div>
                </div>
                {selectedQuiz.id === -1 ? <></> : <div className="separator"/>}
                <div id="quizzes-container">
                    { Object.entries(state.quizzes).map(([_, value], i) => <QuizTile key={i} quizData={{ ...value, id: i}} handleTileClick={handleTileClick} selectedId={selectedQuiz.id}/>) }
                </div>
                <Footer />
            </div>
        );
    }
}

export default Quizzes;