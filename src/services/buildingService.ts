import { api } from "../shared/api";

export async function getAdminBuildings() {
    return api("/api/admin/buildings", {
        method: "GET",
    });
}