"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserQuizzes = exports.getAllQuizzes = void 0;
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
        LIMIT 9;
    `;
    return res;
};
exports.getAllQuizzes = getAllQuizzes;
const getUserQuizzes = (username) => {
    const res = (0, db_1.default) `
        WITH 
            user_ref(user_id) 
        AS (
	        SELECT 
                user_id 
            FROM 
                users 
            WHERE 
                username = 'admin'
        )
        SELECT 
            quiz_name, quiz_category 
        FROM 
            quizzes, user_ref 
        WHERE 
            quizzes.user_id = user_ref.user_id;
    `;
    return res;
};
exports.getUserQuizzes = getUserQuizzes;
