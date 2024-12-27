"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuizzes = void 0;
const db_1 = __importDefault(require("./db"));
const getAllQuizzes = () => {
    const res = (0, db_1.default) `
        SELECT * FROM quizzes
    `;
    return res;
};
exports.getAllQuizzes = getAllQuizzes;
