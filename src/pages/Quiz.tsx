import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { ActiveQuiz, getQuizData } from "../app/slices/quizzesSlice";
import QuizQuestion from "../components/QuizQuestion";

const Quiz = () => {
    
    const params = useParams();
    const dispatch = useAppDispatch();

    const quiz: ActiveQuiz = useAppSelector(state => state.quizzes.activeQuiz);

    useEffect(() => {
        dispatch(getQuizData(Number(params.quiz_id)));
    }, [params.quiz_id, dispatch]);

    return (
        <div id="quiz-question-page">
            {Object.keys(quiz.questions).map((x, i) => {
                const data = quiz.questions[Number(x)];
                return <QuizQuestion key={i} questionNumber={i} questionText={data.question} answerType={data.answer_type} possibleAnswers={data.possibleAnswers ?? []}/>
            })}
        </div>
    );
}

export default Quiz;