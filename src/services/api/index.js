import axios from "axios";
import { getToken } from "context/auth";

const api = axios.create({
    baseURL: "https://bsi-drive-api.herokuapp.com"
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
