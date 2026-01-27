import { create } from "zustand";
import type { Beacon } from "../models/Beacon";

interface BeaconState {
    beacons: Beacon[];
}

export const useBeaconStore = create<BeaconState>(() => ({
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
}));
