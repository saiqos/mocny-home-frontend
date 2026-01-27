import { create } from "zustand";
import type { Floor } from "../models/Floor";

interface FloorState {
    floors: Floor[];
    addFloor: (floor: Floor) => void;
}

export const useFloorStore = create<FloorState>((set) => ({
    floors: [
        {
            id: "f1",
            buildingId: "1",
            level: 0,
            description: "Ground floor – reception area",
            notes: "High traffic zone",
            architecturalBarriers: "No elevator access",
        },
        {
            id: "f2",
            buildingId: "1",
            level: 1,
            description: "Office floor",
            notes: "Restricted access to room 110",
            architecturalBarriers: "Narrow corridor near room 105",
        },
    ],

    addFloor: (floor) =>
        set((state) => ({
            floors: [...state.floors, floor],
        })),
}));
