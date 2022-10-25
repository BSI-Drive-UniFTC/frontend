import axios from "axios";
import { getToken } from "context/auth";

const api = axios.create({
    // baseURL: "https://link da api aqui/"
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
