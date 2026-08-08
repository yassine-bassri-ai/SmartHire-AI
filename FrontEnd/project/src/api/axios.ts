import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 30000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API ERROR :", error);

        if (error.response) {
            console.error(error.response.data);
        }

        return Promise.reject(error);
    }
);

export default api;