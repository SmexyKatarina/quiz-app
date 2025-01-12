"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersDb_1 = require("../db/usersDb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.get("/getUsers", async (req, res, next) => {
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
router.get("/authUser", async (req, res, next) => {
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
router.post("/createUser", async (req, res, next) => {
    const userObj = JSON.parse(req.body);
    const hash = await bcrypt_1.default.hash(userObj.password, 10);
    const user = await (0, usersDb_1.createUser)(userObj.username, hash);
    if (user.count === 0) {
    }
});
router.put("/:username", async (req, res, next) => {
});
router.delete("/deleteUser/:username", async (req, res, next) => {
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
exports.default = router;
