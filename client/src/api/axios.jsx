import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5173/",
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers["auth-token"] = token;
    }
    return config;
});

export default api;