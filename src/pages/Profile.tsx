import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";


import '../css/Profile.css';
import { useAppSelector } from "../app/hooks/hooks";
import { useParams } from "react-router-dom";

const Profile = () => {
    
    const { username } = useParams();
    const user = useAppSelector(state => state.users);

    document.title = `${user.username}'s Profile - QuizIt`;

    /* Add different layout for logged in user VS looking at user profile */

    if (username) {
        return (
            <div id="profile-page">
                <Header />
                <div id="profile-container">
                    <div id="user-information">
                        {/* ADD icon here */}
                        <div>{username}'s Profile</div>
                        {/* Potential options to add more details? Bio? Status? Created on? */}
                    </div>
                    <div className="vert-separator" />
                    <div id="user-statistics">
                        {/* Quizzes created? Quizzes completed (number form)? Favorite Quizzes? */}
                    </div>
                </div>
                <Footer />
            </div> 
        )
    }
    return (
        <div id="profile-page">
            <Header />
            <div id="profile-container">
                <div id="user-information">
                    {/* ADD icon here */}
                    <h4>Your Profile</h4>
                    {/* Potential options to add more details? Bio? Status? Created on? */}
                </div>
                <div className="vert-separator" />
                <div id="user-statistics">
                    <h4>Statistics</h4>
                    {/* Quizzes created? Quizzes completed (number form)? Favorite Quizzes? */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;