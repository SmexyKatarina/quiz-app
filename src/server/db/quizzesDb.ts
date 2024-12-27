import sql from "./db";

export const getAllQuizzes = () => {
    const res = sql`
        SELECT * FROM quizzes
    `
    return res;
}