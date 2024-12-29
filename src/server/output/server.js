"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersDb_1 = require("./db/usersDb");
const quizzesDb_1 = require("./db/quizzesDb");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    console.log(req.headers);
    return next();
});
app.get("/", async (req, res, next) => {
    const user = await (0, usersDb_1.getUser)("");
    if (user.count === 0) {
        res.status(404).send("No user found");
        return next();
    }
    res.status(200).send(`Welcome ${user[0].username}`);
});
app.get("/quizzes", async (req, res, next) => {
    const quizzes = await (0, quizzesDb_1.getAllQuizzes)();
    console.log("Quizzes perhaps?");
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next();
    }
    res.status(200).json({ ...quizzes });
});
app.get("/users/getUser/:username", async (req, res, next) => {
    const user = await (0, usersDb_1.getUser)(req.params.username);
    if (user.count === 0) {
        res.status(404).json({ error: "No user found" });
        return next();
    }
    res.status(200).json({ ...user });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
