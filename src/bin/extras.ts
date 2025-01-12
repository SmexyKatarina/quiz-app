/**
 * Replaces the FetchAPI calls with this custom method to avoid typing api url each time and for clarity of API use.
 * @param path The path to request
 * @param options Optional, Options to attach to the request
 * @returns The JSON response from the API
 */
export const API = async (path: string, options?: {}) => {
    return fetch(`http://localhost:3001/${path}`, { ...options }).then(res => res.json());
}