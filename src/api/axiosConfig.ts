import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_BACK_END_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});

export default api;