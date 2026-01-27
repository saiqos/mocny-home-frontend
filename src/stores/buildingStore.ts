import { create } from "zustand";
import type { Building } from "../models/Building";

interface BuildingState {
    buildings: Building[];
    assignManager: (buildingId: string, userId: string) => void;
    removeManager: (buildingId: string, userId: string) => void;
}

export const useBuildingStore = create<BuildingState>((set) => ({
    buildings: [
        {
            id: "1",
            name: "Head Office",
            address: "Main Street 10",
            description: "Central administration building",
            managerIds: ["2"],
        },
        {
            id: "2",
            name: "Research Center",
            address: "Innovation Ave 5",
            description: "R&D building",
            managerIds: [],
        },
    ],

    assignManager: (buildingId, userId) =>
        set((state) => ({
            buildings: state.buildings.map((b) =>
                b.id === buildingId && !b.managerIds.includes(userId)
                    ? { ...b, managerIds: [...b.managerIds, userId] }
                    : b
            ),
        })),

    removeManager: (buildingId, userId) =>
        set((state) => ({
            buildings: state.buildings.map((b) =>
                b.id === buildingId
                    ? {
                        ...b,
                        managerIds: b.managerIds.filter((id) => id !== userId),
                    }
                    : b
            ),
        })),
}));
