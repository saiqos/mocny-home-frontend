import { create } from "zustand";
import {
    getAdminBuildings,
    createAdminBuilding,
} from "../services/buildingService";

export interface Building {
    id: number;
    name: string;
    floors: unknown[];
}

interface BuildingState {
    buildings: Building[];
    loading: boolean;
    error: string | null;

    fetchBuildings: () => Promise<void>;
    createBuilding: (name: string) => Promise<void>;
}

export const useBuildingStore = create<BuildingState>((set, get) => ({
    buildings: [],
    loading: false,
    error: null,

    fetchBuildings: async () => {
        try {
            set({ loading: true, error: null });

            const data = await getAdminBuildings();

            set({
                buildings: data as Building[],
                loading: false,
            });
        } catch {
            set({
                error: "Failed to fetch buildings",
                loading: false,
            });
        }
    },

    createBuilding: async (name: string) => {
        try {
            set({ loading: true, error: null });

            const newBuilding = await createAdminBuilding(name);

            set({
                buildings: [...get().buildings, newBuilding] as Building[],
                loading: false,
            });
        } catch {
            set({
                error: "Failed to create building",
                loading: false,
            });
        }
    },
}));