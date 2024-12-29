import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authenticateUser } from "../slices/usersSlice";

const Login = () => {

    document.title = "Login - QuizIt";

    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.users);
    
    return (
        <div>
            <Header />
            <div onClick={() => {
                console.log("Clicking on login");
                dispatch(authenticateUser({ username: "admin", password: "admin"}));
            }}>
                Click to login
            </div>
            <div>
                {state.username}
            </div>
            <Footer />
        </div>
    );
}

export default Login;