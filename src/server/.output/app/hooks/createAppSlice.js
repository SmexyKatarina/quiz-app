"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.createAppSlice = (0, toolkit_1.buildCreateSlice)({
    creators: { asyncThunk: toolkit_1.asyncThunkCreator },
});
