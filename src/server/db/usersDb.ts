import sql from "./db";

export const getAllUsers = async () => {
    const res = await sql`
        SELECT 
            username
        FROM 
            users;
    `
    return res;
}

export const getUser = async (username: string) => {
    const res = await sql`
        SELECT
            username,
            password
        FROM 
            users
        WHERE 
            username = ${username};
    `
    return res;
}

export const createUser = async (username: string, password: string) => {
    const res = await sql`
        INSERT INTO 
            users (username, password)
        VALUES 
            (${username}, ${password});
        RETURNING
            user_id;  
    `
    return res;
}

export const deleteUser = async (username: string) => {
    const res = await sql`
        DELETE FROM 
            users 
        WHERE 
            username = ${username}
        RETURNING
            user_id;
    `
    return res;
}   

