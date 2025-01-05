"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("postgres"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${__dirname}/./../../../../.env` });
const sql = (0, postgres_1.default)({
    host: process.env.DBHOSTNAME,
    port: Number(process.env.DBPORT),
    database: process.env.DBDATABASE,
    username: process.env.DBUSER,
    password: process.env.DBPASS
});
exports.default = sql;
