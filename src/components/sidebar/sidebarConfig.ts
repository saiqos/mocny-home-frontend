import type { Role } from "../../models/Role";

export const sidebarConfig: Record<Role, { label: string; path: string }[]> = {
    ADMIN: [
        { label: "Users", path: "/admin/users" },
        { label: "Buildings", path: "/buildings" },
        { label: "Events", path: "/events" },
    ],
    MANAGER: [
        { label: "My Buildings", path: "/buildings" },
        { label: "Events", path: "/events" },
    ],
    USER: [
        { label: "Buildings", path: "/buildings" },
    ],
};
