import React, { SetStateAction, Dispatch } from "react";
import QuestionInput from "./QuestionInput";

const QuizQuestion = (props: 
    { 
        questionNumber: number, 
        questionText: string, 
        answerType: string, 
        possibleAnswers: string[], 
        answers: { 
            [questionNumber: number]: { 
                answer: string, 
                answered: boolean 
        }}, 
        setAnswer: Dispatch<SetStateAction<{ 
            [questionNumber: number]: { 
                answer: string, 
                answered: boolean 
            } 
        }>>, 
        submitClicked: boolean 
    }
) => {
    
    const { questionNumber, questionText, answerType, possibleAnswers, answers, setAnswer, submitClicked } = props;


    return (
        <div className="quiz-question">
            <h3>{questionNumber} - {questionText}</h3>
            <QuestionInput 
            questionNumber={questionNumber} 
            answerType={answerType} 
            possibleAnswers={possibleAnswers} 
            answers={answers} setAnswer={setAnswer}
            submitClicked={submitClicked}/>
        </div>
    );
}

export default QuizQuestion;