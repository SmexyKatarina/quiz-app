import express, { Request, Response, NextFunction, Router } from "express";

import { getAllQuizzes, getQuiz } from "../db/quizzesDb";

import { ActiveQuiz } from "../../app/slices/quizzesSlice";

const router: Router = express.Router({ mergeParams: true});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const quizzes = await getAllQuizzes();
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next();
    }
    res.status(200).json({ ...quizzes });
    return next();
});

router.get("/getQuiz/:quizId", async (req: Request, res: Response, next: NextFunction) => {
    const quizData = await getQuiz(Number(req.params['quizId']));
    const obj: ActiveQuiz = {
        quiz_id: -1,
        quiz_name: "",
        questions: {}
    }

    if (quizData.count === 0) {
        res.status(404).json({ error: "There is no data for this quiz" });
        return next();
    }

    obj.quiz_id = quizData[0].quiz_id;
    obj.quiz_name = quizData[0].quiz_name;

    quizData.forEach(row => {
        const { question_id, question_text, answer_type, possible_answers } = row;
        obj.questions[question_id] = {
            question: question_text,
            answer_type: answer_type,
            possibleAnswers: possible_answers ?? []
        }
    });

    res.status(200).json({ quiz: obj });
    return next();
});

export default router;