import { create } from "zustand";
import type { Beacon } from "../models/Beacon";

interface BeaconState {
    beacons: Beacon[];
    addBeacon: (beacon: Omit<Beacon, 'id'>) => void;
    updateBeacon: (id: string, data: Partial<Beacon>) => void;
    deleteBeacon: (id: string) => void;
}

export const useBeaconStore = create<BeaconState>((set) => ({
    beacons: [
        {
            id: "b1",
            buildingId: "1",
            beaconId: "BEACON-001",
            locationDescription: "Entrance to ground floor",
        },
        {
            id: "b2",
            floorId: "f2",
            beaconId: "BEACON-002",
            locationDescription: "Near conference room",
        },
    ],

    addBeacon: (beacon) =>
        set((state) => ({
            beacons: [...state.beacons, { ...beacon, id: crypto.randomUUID() }],
        })),

    updateBeacon: (id, data) =>
        set((state) => ({
            beacons: state.beacons.map((b) =>
                b.id === id ? { ...b, ...data } : b
            ),
        })),

    deleteBeacon: (id) =>
        set((state) => ({
            beacons: state.beacons.filter((b) => b.id !== id),
        })),

}));
