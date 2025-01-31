import sql from "./db";

export const getAllQuizzes = () => {
    const res = sql`
        SELECT 
            quizzes.quiz_id, quizzes.quiz_name, quizzes.quiz_category, users.username 
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

export const createQuiz = (quiz_name: string, quiz_category: number, username: string) => {
    const res = sql`
        INSERT INTO 
            quizzes (user_id, quiz_name, quiz_category) 
        SELECT user_id, ${quiz_name}, ${quiz_category} FROM users WHERE 
    `;
    return res;
}

export const getQuiz = (quiz_id: number) => {
    const res = sql`
        SELECT 
            quizzes.quiz_id, quiz_name, question_id, question_text, answer_type, possible_answers 
        FROM 
            quizzes, questions
        WHERE 
            quizzes.quiz_id = ${quiz_id}
        AND 
            questions.quiz_id = ${quiz_id};
    `;
    return res;
}

export const getUserQuizzes = (username: string) => {
    const res = sql`
        SELECT 
            quiz_name, quiz_category 
        FROM 
            quizzes
        WHERE 
            quizzes.user_id = (SELECT user_id FROM users WHERE username = ${username});
    `
    return res;
}