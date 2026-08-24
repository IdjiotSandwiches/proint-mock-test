import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5137/api",
    headers: {
        "Content-Type": "application/json",
    },
});