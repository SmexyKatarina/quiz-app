import React from "react";
import QuestionInput from "./QuestionInput";

const QuizQuestion = (props: { questionNumber: number, questionText: string, answerType: string, possibleAnswers: string[] }) => {
    
    const { questionNumber, questionText, answerType, possibleAnswers } = props;


    return (
        <div className="quiz-question-container">
            <h3>{questionNumber} - {questionText}</h3>
            <QuestionInput questionNumber={questionNumber} answerType={answerType} possibleAnswers={possibleAnswers} />
        </div>
    );
}

export default QuizQuestion;