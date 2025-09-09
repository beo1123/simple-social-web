import axios from "axios";

export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000, // optional: timeout 10s
    headers: {
        "Content-Type": "application/json",
    },
});
