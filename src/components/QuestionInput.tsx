import React, { Dispatch, SetStateAction} from "react";

const QuestionInput = (props: 
    { 
        questionNumber: number, 
        answerType: string, 
        possibleAnswers: string[], 
        answers: { 
            [questionNumber: number]: { 
                answer: string, 
                answered: boolean 
            } 
        }, 
        setAnswer: Dispatch<SetStateAction<{ 
            [questionNumber: number]: { 
                answer: string, 
                answered: boolean 
            } 
        }>>, 
        submitClicked: boolean
    }
) => {
    
    const { questionNumber, answerType, possibleAnswers, answers, setAnswer, submitClicked } = props;

    const createInput = (value: any, index: number) => {
        return (
            <div key={index}>
                <input type="radio" id={`question-${questionNumber}-${index}`} name={`question-${questionNumber}`} value={value}/>
                <label htmlFor={`question-${questionNumber}-${index}`}>{value}</label>
            </div>
        );
    }

    switch (answerType) {
        
        case "TEXT": 
            return (
                <div className="question-input answer-type-text">
                    <input type="text" id={`question-${questionNumber}`} value={answers[questionNumber] ? answers[questionNumber].answer : ""} onChange={(e) => { setAnswer(prev => { return { ...prev, questionNumber: { answer: e.currentTarget.value, answered: e.currentTarget.value === "" ? false : true } }; }); }}/>
                    <p className="answer-error hidden">Question is required to be answered.</p>
                </div>
            );
        case "MULTIPLE_CHOICE":
            return (
                <div className="question-input answer-type-choice">
                    {possibleAnswers.map((x, i) => { return createInput(x, i); })}
                    <p className={`answer-error ${(answers[questionNumber] ? answers[questionNumber].answered : false) && submitClicked ? "" : "hidden"}`}>Question is required to be answered.</p>  
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