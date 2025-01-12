import React from "react";
import { useNavigate } from "react-router-dom";

const Invalid = () => {
    
    const navigate = useNavigate();

    return (
        <div id="invalid-page">
            <h1>Invalid permissions</h1>
            <p>You don't have the required permissions to view this page. If you think this is a mistake, contact support to help with your account permissions.</p>
            <button onClick={() => { navigate(-1); }}>Go back</button>
        </div>
    );
}

export default Invalid;