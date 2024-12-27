import express, { Express, Request, Response, NextFunction } from "express";
import { getUser } from "./db/usersDb";
import { getAllQuizzes } from "./db/quizzesDb";
import cors from "cors";
const app: Express = express();
const port = 3001;

app.use(cors());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser("");
    if (user.count === 0) {
        res.status(404).send("No user found");
        return next;
    }
    res.status(200).send(`Welcome ${user[0].username}`);
});

app.get("/quizzes", async(req: Request, res: Response, next: NextFunction) => {
    const quizzes = await getAllQuizzes();
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next;
    }
    res.status(200).send({ ...quizzes });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});