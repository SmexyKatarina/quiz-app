import React from "react";

const QuizTile = (props: { quizData: { quiz_name: string, quiz_category: number, username: string } }) => {
    
    const { quiz_name, quiz_category, username } = props.quizData;
    
    return (
        <div className="quiz-tile">
            <div className="quiz-name">{quiz_name}</div>
            <div className="quiz-name">Category: {quiz_category}</div>
            <div className="quiz-createdBy">Created By: {username}</div>
        </div>
    );
}

export default QuizTile;