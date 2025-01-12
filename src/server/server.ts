import express, { Express } from "express";

import cors from "cors";

import userRouter from './routes/usersRouter';
import quizRouter from './routes/quizzesRouter';

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/quizzes", quizRouter);
app.use("/users", userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});