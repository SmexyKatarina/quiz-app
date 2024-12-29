import express, { Express, Request, Response, NextFunction } from "express";
import { getUser } from "./db/usersDb";
import { getAllQuizzes } from "./db/quizzesDb";
import cors from "cors";
const app: Express = express();
const port = 3001;

app.use(cors());

app.use((req, res, next) => {
    console.log(req.headers);
    return next();
})

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser("");
    if (user.count === 0) {
        res.status(404).send("No user found");
        return next();
    }
    res.status(200).send(`Welcome ${user[0].username}`);
});

app.get("/quizzes", async (req: Request, res: Response, next: NextFunction) => {
    const quizzes = await getAllQuizzes();
    console.log("Quizzes perhaps?");
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next();
    }
    res.status(200).json({ ...quizzes });
})

app.get("/users/getUser/:username", async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req.params.username);
    if (user.count === 0) {
        res.status(404).json({ error: "No user found" });
        return next();
    }
    res.status(200).json({ ...user });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});