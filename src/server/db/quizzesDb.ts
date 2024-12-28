import sql from "./db";

export const getAllQuizzes = () => {
    const res = sql`
        SELECT 
            quizzes.quiz_name, quizzes.quiz_category, users.username 
        FROM 
            quizzes
        INNER JOIN
            users
        ON
            quizzes.user_id = users.user_id
        LIMIT 9;
    `
    return res;
}