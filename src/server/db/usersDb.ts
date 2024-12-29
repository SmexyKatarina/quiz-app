import sql from "./db";

export const getUser = async (username: string) => {
    console.log("Searching DB");
    const res = await sql`
        select
            username,
            password
        from users
        where username = ${username}
    `
    return res;
}

export const createUser = async (username: string, password: string) => {
    const res = await sql`
        insert into users 
            (username, password)
        values (${username}, ${password});
    `
    return res;
}