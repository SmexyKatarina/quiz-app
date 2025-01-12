"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("./db"));
const getAllUsers = async () => {
    const res = await (0, db_1.default) `
        SELECT 
            username
        FROM 
            users;
    `;
    return res;
};
exports.getAllUsers = getAllUsers;
const getUser = async (username) => {
    const res = await (0, db_1.default) `
        SELECT
            username,
            password
        FROM 
            users
        WHERE 
            username = ${username};
    `;
    return res;
};
exports.getUser = getUser;
const createUser = async (username, password) => {
    const res = await (0, db_1.default) `
        INSERT INTO 
            users (username, password)
        VALUES 
            (${username}, ${password});
        RETURNING
            user_id;  
    `;
    return res;
};
exports.createUser = createUser;
const deleteUser = async (username) => {
    const res = await (0, db_1.default) `
        DELETE FROM 
            users 
        WHERE 
            username = ${username}
        RETURNING
            user_id;
    `;
    return res;
};
exports.deleteUser = deleteUser;
