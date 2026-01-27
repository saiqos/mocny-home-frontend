import { create } from "zustand";
import type { User } from "../models/User";
import type { Role } from "../models/Role";

interface UserState {
    users: User[];
    toggleActive: (id: string) => void;
    changeRole: (id: string, role: Role) => void;
    addUser: (user: Omit<User, "id">) => void;
}

export const useUserStore = create<UserState>((set) => ({
    users: [
        {
            id: "1",
            firstName: "Admin",
            lastName: "User",
            email: "admin@test.com",
            role: "ADMIN",
            isActive: true,
        },
        {
            id: "2",
            firstName: "John",
            lastName: "Manager",
            email: "manager@test.com",
            role: "MANAGER",
            isActive: true,
        },
        {
            id: "3",
            firstName: "Anna",
            lastName: "User",
            email: "user@test.com",
            role: "USER",
            isActive: true,
        },
    ],

    toggleActive: (id) =>
        set((state) => ({
            users: state.users.map((u) =>
                u.id === id ? { ...u, isActive: !u.isActive } : u
            ),
        })),

    changeRole: (id, role) =>
        set((state) => ({
            users: state.users.map((u) =>
                u.id === id ? { ...u, role } : u
            ),
        })),

    addUser: (user) =>
        set((state) => ({
            users: [
                ...state.users,
                {
                    ...user,
                    id: crypto.randomUUID(),
                },
            ],
        })),

}));
