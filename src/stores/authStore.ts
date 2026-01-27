import { create } from "zustand";
import type { Role } from "../models/Role";

interface AuthState {
    role: Role | null;
    userId: string | null;
    login: (userId: string, role: Role) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    role: null,
    userId: null,

    login: (userId, role) =>
        set({
            userId,
            role,
        }),

    logout: () =>
        set({
            userId: null,
            role: null,
        }),
}));
