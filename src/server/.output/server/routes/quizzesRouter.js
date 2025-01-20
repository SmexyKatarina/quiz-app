"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizzesDb_1 = require("../db/quizzesDb");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", async (req, res, next) => {
    const quizzes = await (0, quizzesDb_1.getAllQuizzes)();
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next();
    }
    res.status(200).json({ ...quizzes });
    return next();
});
router.get("/getQuiz/:quizId", async (req, res, next) => {
    const quizData = await (0, quizzesDb_1.getQuiz)(Number(req.params['quizId']));
    const obj = {
        quiz_id: -1,
        quiz_name: "",
        questions: {}
    };
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
        };
    });
    res.status(200).json({ quiz: obj });
    return next();
});
exports.default = router;
