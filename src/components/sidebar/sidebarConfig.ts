import type { Role } from "../../models/Role";

export const sidebarConfig: Record<Role, { label: string; path: string }[]> = {
    Admin: [
        { label: "Users", path: "/admin/users" },
        { label: "Buildings", path: "/buildings" },
        { label: "Events", path: "/events" },
    ],
    Manager: [
        { label: "My Buildings", path: "/buildings" },
        { label: "Events", path: "/events" },
    ],
    User: [
        { label: "Buildings", path: "/buildings" },
    ],
};
