"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersDb_1 = require("./db/usersDb");
const quizzesDb_1 = require("./db/quizzesDb");
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.get("/quizzes", async (req, res, next) => {
    const quizzes = await (0, quizzesDb_1.getAllQuizzes)();
    if (quizzes.count === 0) {
        res.status(404).json({ error: "No quizzes found" });
        return next();
    }
    res.status(200).json({ ...quizzes });
    return next();
});
app.get("/users/getUsers/", async (req, res, next) => {
    const users = await (0, usersDb_1.getAllUsers)();
    if (users.count === 0) {
        res.status(404).json({ error: "No users found" });
        return next();
    }
    res.status(200).json({
        usernames: users
    });
    return next();
});
app.get("/users/getUser/", async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: "No credentials" });
        return next();
    }
    const [username, password] = atob(req.headers.authorization.split(" ")[1]).split(":");
    const user = await (0, usersDb_1.getUser)(username);
    console.log(user.state);
    if (user.count === 0) {
        res.status(401).json({ error: "No user found" });
        return next();
    }
    const compare = await bcrypt_1.default.compare(password, user[0].password);
    if (compare) {
        res.status(200).json({ ...user });
        return next();
    }
    else {
        res.status(401).json({ error: "Incorrect password" });
        return next();
    }
});
app.delete("/users/deleteUser/:username", async (req, res, next) => {
    const username = req.params.username;
    const delUser = await (0, usersDb_1.deleteUser)(username);
    if (delUser.count === 0) {
        res.status(410).json({ error: "User doesn't exist" });
        return next();
    }
    else {
        res.status(200).json({ message: "User has been deleted" });
        return next();
    }
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
