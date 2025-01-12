"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizzesDb_1 = require("../db/quizzesDb");
const router = express_1.default.Router();
router.get("/", async (req, res, next) => {
    const quizzes = await (0, quizzesDb_1.getAllQuizzes)();
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next();
    }
    res.status(200).json({ ...quizzes });
    return next();
});
exports.default = router;
