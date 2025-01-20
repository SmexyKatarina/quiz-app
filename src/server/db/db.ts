import postgres from "postgres";
import env from "dotenv";

env.config({ path: `${__dirname}/./../../../../../.env`});

const sql = postgres({
    host: process.env.DBHOSTNAME,
    port: Number(process.env.DBPORT),
    database: process.env.DBDATABASE,
    username: process.env.DBUSER,
    password: process.env.DBPASS
});

export default sql;