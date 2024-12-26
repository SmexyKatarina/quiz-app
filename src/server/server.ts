import express, { Express, Request, Response } from "express";
import { getUser } from "./users/usersDb.js";
import cors from "cors";
const app: Express = express();
const port = 3001;

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
    const user = await getUser("");
    if (user.count === 0) {
        res.status(404).send("No user found");
        return;
    }
    res.status(200).send(`Welcome ${user[0].username}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});