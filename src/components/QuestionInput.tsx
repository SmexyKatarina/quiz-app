import React from "react";

const QuestionInput = (props: { questionNumber: number, answerType: string, possibleAnswers: string[] }) => {
    
    const { questionNumber, answerType, possibleAnswers } = props;

    switch (answerType) {
        
        case "TEXT": 
            return (
                <div className="question-input answer-type-text">
                    <input type="text" id={`question-value-${questionNumber}`}/>
                </div>
            );
        case "MULTIPLE_CHOICE":
            return (
                <div className="question-input answer-type-choice">
                    {possibleAnswers.map(x => { return <input type="radio" id={`question-value-${questionNumber}`} value={x}/>; })}
                </div>
            );
        default:
            return (
                <div className="question-input">
                    <h1>Unsupported answer type. Contact support.</h1>
                </div>
            )
    }
}

export default QuestionInput;