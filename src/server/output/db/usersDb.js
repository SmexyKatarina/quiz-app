"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const db_1 = __importDefault(require("./db"));
const getUser = async (username) => {
    const res = await (0, db_1.default) `
        select
            username,
            password
        from users
        where username = ${username}
    `;
    return res;
};
exports.getUser = getUser;
const createUser = async (username, password) => {
    const res = await (0, db_1.default) `
        insert into users 
            (username, password)
        values (${username}, ${password});
    `;
    return res;
};
exports.createUser = createUser;
