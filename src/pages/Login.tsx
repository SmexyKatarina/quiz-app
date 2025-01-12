import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authenticateUser, createUser } from "../app/usersSlice";
import { useNavigate } from "react-router-dom";

import '../css/Login.css';

const Login = () => {

    document.title = "Login - QuizIt";

    const [userInfo, setUserInfo] = useState({ username: "", password: "" });
    const [signup, setSignup] = useState(false);
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.users);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (state.username !== "") {
            navigate("/");
        }
    }, [state.username, navigate]);

    return (
        <div id="login-page">
            <Header />
            <div id="login-container">
                <h3>{signup ? "Sign up for" : "Login to"} QuizIt</h3>
                <div id="login-inputs">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={userInfo.username} onChange={(e) => { setUserInfo(user => { return { ...user, username: e.target.value } }); }}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={userInfo.password} onChange={(e) => { setUserInfo(user => { return { ...user, password: e.target.value } }); }}/>
                    <button onClick={() => {
                        if (signup) {
                            dispatch(createUser({ username: userInfo.username, password: userInfo.password }));
                        } else {
                            dispatch(authenticateUser({ username: userInfo.username, password: userInfo.password }));
                        }
                    }}>{signup ? "Sign up" : "Login"}</button>
                </div>
                <div id="sign-up">
                    {!signup ? <p>Don't have an account? <span onClick={() => { setSignup(true); }}>Sign up now.</span></p> : <p>Already have an account? <span onClick={() => { setSignup(false); }}>Sign in now.</span></p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;