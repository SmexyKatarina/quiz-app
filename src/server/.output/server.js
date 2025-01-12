"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const quizzesRouter_1 = __importDefault(require("./routes/quizzesRouter"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/quizzes", quizzesRouter_1.default);
app.use("/users", usersRouter_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
