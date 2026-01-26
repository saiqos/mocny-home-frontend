import type { Role } from "./Role";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    isActive: boolean;
}