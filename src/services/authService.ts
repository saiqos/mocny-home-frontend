import { api } from "../shared/api";

export interface AuthResponse {
    username: string;
    roles: string[];
    token: string;
    expires: string;
}

export async function loginRequest(
    username: string,
    password: string
) {
    return api<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
}

export async function registerRequest(
    username: string,
    email: string,
    password: string
) {
    return api<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
    });
}