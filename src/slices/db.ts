import postgres from "postgres";

require("dotenv").config();

const sql = postgres({
    host: process.env.DBHOSTNAME,
    port: Number(process.env.DBPORT),
    database: process.env.DBDATABASE,
    username: process.env.DBUSER,
    password: process.env.DBPASS
});

export default sql;