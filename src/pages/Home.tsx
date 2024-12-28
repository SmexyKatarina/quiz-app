import Header from "../components/Header";
import Footer from "../components/Footer";

import '../css/Home.css';

const Home = () => {

    document.title = "Home - QuizIt";

    return (
        <div id="home">
            <Header />
            <div id="home-container">
                <div id="welcome">
                    <h1 className="section-header">Welcome to Quiz-It!</h1>
                    <p className="section-description">An app designed to host all sorts of quizzes intended for all people to use and create their quizzes.</p>
                </div>
                <div id="features">
                    <h3 className="section-header">Features</h3>
                    <p className="section-description">This features a bit of everything on your typical quiz website</p>
                    <p className="section-description">- The ability to create any quiz that you want, with an account of course</p>
                    <p className="section-description">- Complete quizzes that other people have made</p>
                    <p className="section-description">- View the statistics of your quizzes you have created and finished</p>
                </div>  
                <div id="advantages">
                    <h3 className="section-header">Join us today and...</h3>
                    <p className="section-description">You can start creating new quizzes right away!</p>
                    <p className="section-description">You can also start requesting features that could be implemented in the future.</p>
                    <p className="section-description">You can head to our GitHub and make a ticket with a feature to be added: <span>Make a Ticket!</span></p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;