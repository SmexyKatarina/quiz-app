import React from "react";

import '../css/Quizzes.css';

const QuizTile = (props: { quizData: { quiz_id: number, quiz_name: string, quiz_category: number, username: string, id: number }, handleTileClick: ({currentTarget}: React.MouseEvent<HTMLDivElement, MouseEvent>, selectedQuiz: {
    quiz_id: number
    quiz_name: string
    quiz_category: number
    username: string
    id: number
}) => void, selectedId: number}) => {
    
    const { quizData: { quiz_name, quiz_category, username, id }, handleTileClick, selectedId } = props;

    return (
        <div className={"quiz-tile" + (selectedId === id ? " quiz-selected" : "")} onClick={(e) => { handleTileClick(e, props.quizData)}}>
            <div className="quiz-name">{quiz_name}</div>
            <div className="quiz-info">{quiz_category} — By {username}</div>
        </div>
    );
}

export default QuizTile;