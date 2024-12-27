import React from "react";
import { useNavigate } from "react-router-dom";

import '../css/Header.css';

const Header = () => {
    
    const navigate = useNavigate();

    return (
        <div id="header">
            <h4 id="quiz-icon">QuizIt</h4>
            <h4 id="quizzes-button" onClick={() => { navigate("/quizzes")}}>Quizzes</h4>
            <h4 id="login">Login</h4>
        </div>
    );
}

export default Header;