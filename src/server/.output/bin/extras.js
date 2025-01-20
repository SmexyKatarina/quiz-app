"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLengthOfObject = exports.API = void 0;
/**
 * Replaces the FetchAPI calls with this custom method to avoid typing api url each time and for clarity of API use.
 * @param path The path to request
 * @param options Optional, Options to attach to the request
 * @returns The JSON response from the API
 */
const API = async (path, options) => {
    return await fetch(`http://localhost:3001/${path}`, { ...options }).then(res => res.json());
};
exports.API = API;
const getLengthOfObject = (obj) => {
    return Object.keys(obj).length;
};
exports.getLengthOfObject = getLengthOfObject;
