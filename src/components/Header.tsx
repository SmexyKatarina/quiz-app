import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import '../css/Header.css';
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { userActions } from "../app/slices/usersSlice";

const Header = () => {
    
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.users);


    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/login") {
        return (
            <div id="header">
                <h4 id="quiz-icon" onClick={() => { navigate("/"); }}>QuizIt</h4>
                <h4 id="login" onClick={() => { navigate("/"); }}>Back</h4>
            </div>
        );
    } else if (location.pathname.match(/\/quiz\/[0-9]+/g)?.[0]) {
        return (
            <div id="header">
                <h4 id="quiz-icon" onClick={() => { navigate("/"); }}>QuizIt</h4>
                <h4 id="login" onClick={() => { navigate(-1); }}>Back</h4>
            </div>
        )
    } else if (user.authenticated) {
        return (
            <div id="header">
                <h4 id="quiz-icon" onClick={() => { navigate("/"); }}>QuizIt</h4>
                <h4 id="quizzes-button" onClick={() => { navigate("/quizzes"); }}>Quizzes</h4>  
                <div id="user-info">
                    <h4 id="header-profile" onClick={() => { navigate("/profile"); }}>Profile</h4>
                    <h4 id="login" onClick={() => { dispatch(userActions.deauthenticateUser()); }}>Logout</h4>
                </div>
            </div>
        );
    } else
        return (
            <div id="header">
                <h4 id="quiz-icon" onClick={() => { navigate("/"); }}>QuizIt</h4>
                <h4 id="quizzes-button" onClick={() => { navigate("/quizzes"); }}>Quizzes</h4>
                <h4 id="login" onClick={() => { navigate("/login"); }}>Login</h4>
            </div>
        );
}

export default Header;