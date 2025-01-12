import React from "react";

import Header from "./Header";
import Footer from "./Footer";

const Component = () => {
    
    return (
        <div id="profile-page">
            <Header />
            <div id="profile-container">
                <div id="user-information">

                </div>
                <div className="vert-separator" />
                <div id="user-statistics">
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Component;