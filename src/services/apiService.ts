import api from "@/api/axiosConfig";
import router from "@/router";
import { CreateEvent } from "@/types/event";
import { useStore } from 'vuex';


export const apiService = {
    async fetchEvents() {
        try {
            const response = await api.get("/events");
            return response.data;
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    },
    async fetchEventById(id: number) {
        try {
            const response = await api.get(`/events/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching event:", error);
        }
    },
    async createEvent(event: CreateEvent) {
        try {
            const response = await api.post("/events", event);
            return response.data;
        } catch (error) {
            console.error("Error creating event:", error);
        }
    },
    async login(credentials: { email: string; password: string }) {
        try {
            const response = await api.post("/auth/login", credentials);
            return response.data.token;
        } catch (error) {
            console.error("Error logging in:", error);
            return false;
        }
    },
    async register(user: { name: string, email: string, password: string, password_confirmation: string }) {
        const response = await api.post("/user/register", user);
        return response.data;
    },
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token).plainTextToken}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const store = useStore();
            store.dispatch("logout");
            router.push("/login");

            return Promise.reject(new Error("Sessão expirada. Faça login novamente."));
        }

        return Promise.reject(error.response?.data || new Error("Erro desconhecido"));
    }
);
