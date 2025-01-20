import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { ActiveQuiz, getQuizData } from "../app/slices/quizzesSlice";
import QuizQuestion from "../components/QuizQuestion";
import Header from "../components/Header";
import Footer from "../components/Footer";

import '../css/Quiz.css';

const Quiz = () => {
    
    const params = useParams();
    const dispatch = useAppDispatch();

    const quiz: ActiveQuiz = useAppSelector(state => state.quizzes.activeQuiz);

    const [answers, setAnswers] = useState<{ [questionNumber: number]: { answer: string, answered: boolean } }>({});
    const [submitClicked, setSubmitClicked] = useState(false);

    useEffect(() => {
        dispatch(getQuizData(Number(params.quiz_id)));
        setAnswers(() => {
            let obj = {};
            Object.keys(quiz.questions).forEach(x => obj = { ...obj, [Number(x)]: { answer: "", answered: false }});
            return obj;
        })
    }, [params.quiz_id, quiz.questions, dispatch]);

    const submitAnswers = () => {
        setSubmitClicked(true);
        if (!Object.keys(answers).map(key => answers[Number(key)].answered).every(x => x)) {
            return;
        }
    }

    return (
        <div id="quiz-question-page">
            <Header />
            <div id="quiz-content">
                <h1 id="quiz-name">{quiz.quiz_name}</h1>
                <p id="quiz-total-questions">Total questions: {Object.keys(quiz.questions).length  }</p>
                <div id="questions-container">
                    {Object.keys(quiz.questions).map((x, i) => {
                        const data = quiz.questions[Number(x)];
                        return <QuizQuestion 
                            key={i} 
                            questionNumber={i + 1} 
                            questionText={data.question} 
                            answerType={data.answer_type} 
                            possibleAnswers={data.possibleAnswers ?? []} 
                            answers={answers} setAnswer={setAnswers}
                            submitClicked={submitClicked}
                        />;
                    })}
                </div>
                <button id="submit-answers" onClick={() => { submitAnswers(); }}>Submit Answers</button>
            </div>
            <Footer />
        </div>
    );
}

export default Quiz;