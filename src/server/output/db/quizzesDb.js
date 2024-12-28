"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuizzes = void 0;
const db_1 = __importDefault(require("./db"));
const getAllQuizzes = () => {
    const res = (0, db_1.default) `
        SELECT 
            quizzes.quiz_name, quizzes.quiz_category, users.username 
        FROM 
            quizzes
        INNER JOIN
            users
        ON
            quizzes.user_id = users.user_id
    `;
    return res;
};
exports.getAllQuizzes = getAllQuizzes;
