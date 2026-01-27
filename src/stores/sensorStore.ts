import { create } from "zustand";
import type { Sensor } from "../models/Sensor";

interface SensorState {
    sensors: Sensor[];
}

export const useSensorStore = create<SensorState>(() => ({
    sensors: [
        {
            id: "s1",
            buildingId: "1",
            externalSensorId: "ABC123",
            type: "SMOKE_DETECTOR",
            locationDescription: "Floor 1 corridor",
        },
        {
            id: "s2",
            floorId: "f1",
            externalSensorId: "BTN456",
            type: "PANIC_BUTTON",
            locationDescription: "Reception desk",
        },
    ],
}));
