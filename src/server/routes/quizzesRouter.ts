import express, { Request, Response, NextFunction, Router } from "express";

import { getAllQuizzes } from "../db/quizzesDb";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const quizzes = await getAllQuizzes();
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next();
    }
    res.status(200).json({ ...quizzes });
    return next();
});

export default router;