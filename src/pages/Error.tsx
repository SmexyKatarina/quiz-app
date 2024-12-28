import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    
    document.title = "Error - QuizIt";

    const navigate = useNavigate();

    return (
        <div id="Error-Page">
            <h1>Unfortunately, this page doesn't exist.</h1>
            <h4>Please go back and try a different page.</h4>
            <button onClick={() => { navigate(-1); }}>Go back</button>
        </div>
    );
}

export default Error;