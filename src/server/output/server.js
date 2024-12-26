"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersDb_1 = require("./users/usersDb");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.get("/", async (req, res) => {
    const user = await (0, usersDb_1.getUser)("Hello");
    if (user.count === 0) {
        res.status(404).send("No user found");
        return;
    }
    res.status(200).send(`Welcome ${user[0].username}`);
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
