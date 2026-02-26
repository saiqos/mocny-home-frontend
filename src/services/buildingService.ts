import { api } from "../shared/api";

export async function getAdminBuildings() {
    return api("/api/admin/buildings", {
        method: "GET",
    });
}

export async function createAdminBuilding(name: string) {
    return api("/api/admin/buildings", {
        method: "POST",
        body: JSON.stringify({ name }),
    });
}