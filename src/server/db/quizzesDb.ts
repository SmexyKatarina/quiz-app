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

export const getUserQuizzes = (username: string) => {
    const res = sql`
        WITH 
            user_ref(user_id) 
        AS (
	        SELECT 
                user_id 
            FROM 
                users 
            WHERE 
                username = ${username}
        )
        SELECT 
            quiz_name, quiz_category 
        FROM 
            quizzes, user_ref 
        WHERE 
            quizzes.user_id = user_ref.user_id;
    `
    return res;
}