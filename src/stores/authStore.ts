import { create } from "zustand";
import type { Role } from "../models/Role";

interface AuthState {
    token: string | null;
    username: string | null;
    role: Role | null;

    login: (data: {
        token: string;
        username: string;
        role: Role;
    }) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role") as Role,

    login: ({ token, username, role }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        set({ token, username, role });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        set({ token: null, username: null, role: null });
    },
}));