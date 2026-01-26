import { create } from "zustand";
import type { Role } from "../models/Role";

interface AuthState {
    role: Role;
    setRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    role: 'ADMIN',
    setRole: (role) => set({ role }),
}));