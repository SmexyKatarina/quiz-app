import React from "react";

import '../css/Footer.css';

const Footer = () => {
    
    return (
        <div id="footer">
            <div id="made-by" className="footer-link" onClick={() => { window.open("https://www.github.com/smexykatarina", "_blank") }}>Quiz-It made by Titus</div>
            <div id="github" className="footer-link" onClick={() => { window.open("https://www.github.com/smexykatarina/quiz-app", "_blank")}}>See the code here...</div>
        </div>
    );
}

export default Footer;