import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import '../css/Header.css';

const Header = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/login") {
        return (
            <div id="header">
                <h4 id="quiz-icon" onClick={() => { navigate("/"); }}>QuizIt</h4>
                <h4 id="login" onClick={() => { navigate("/"); }}>Back</h4>
            </div>
        );
    }

    return (
        <div id="header">
            <h4 id="quiz-icon" onClick={() => { navigate("/"); }}>QuizIt</h4>
            <h4 id="quizzes-button" onClick={() => { navigate("/quizzes"); }}>Quizzes</h4>
            <h4 id="login" onClick={() => { navigate("/login"); }}>Login</h4>
        </div>
    );
}

export default Header;