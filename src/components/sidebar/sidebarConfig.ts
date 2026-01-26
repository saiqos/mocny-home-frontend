import type { Role } from "../../models/Role";

export const sidebarConfig: Record<Role, { label: string; path: string }[]> = {
    ADMIN: [
        { label: "Users", path: "/admin/users" },
        { label: "Buildings", path: "/admin/buildings" },
        { label: "Events", path: "/admin/events" },
    ],
    MANAGER: [
        { label: "My Buildings", path: "/manager/buildings" },
        { label: "Floors & Rooms", path: "/manager/structure" },
        { label: "Sensors & Beacons", path: "/manager/devices" },
        { label: "Events", path: "/manager/events" },
    ],
    USER: [
        { label: "Buildings", path: "/buildings" },
    ],
};
