import express, { Express, Request, Response, NextFunction } from "express";
import { getUser } from "./db/usersDb";
import { getAllQuizzes } from "./db/quizzesDb";
import cors from "cors";
import bcrypt from "bcrypt";
const app: Express = express();
const port = 3001;

app.use(cors());

app.get("/quizzes", async (req: Request, res: Response, next: NextFunction) => {
    const quizzes = await getAllQuizzes();
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next();
    }
    res.status(200).json({ ...quizzes });
})

app.get("/users/getUser/", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: "No credentials"});
        return next();
    }
    console.log(bcrypt.hashSync("admin", 10));
    const [username, password] = atob(req.headers.authorization.split(" ")[1]).split(":");
    const user = await getUser(username);
    if (user.count === 0) {
        res.status(404).json({ error: "No user found" });
        return next();
    }
    const compare = await bcrypt.compare(password, user[0].password);
    if (compare) {
        res.status(200).json({ ...user });
        return next();
    } else {
        res.status(401).json({ error: "Incorrect password" });
        return next();
    }
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});