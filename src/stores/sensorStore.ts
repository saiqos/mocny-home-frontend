import { create } from "zustand";
import type { Sensor } from "../models/Sensor";

interface SensorState {
    sensors: Sensor[];
    addSensor: (beacon: Omit<Sensor, 'id'>) => void;
    updateSensor: (id: string, data: Partial<Sensor>) => void;
    deleteSensor: (id: string) => void;
}

export const useSensorStore = create<SensorState>((set) => ({
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

    addSensor: (beacon) =>
        set((state) => ({
            sensors: [...state.sensors, { ...beacon, id: crypto.randomUUID() }],
        })),

    updateSensor: (id, data) =>
        set((state) => ({
            sensors: state.sensors.map((b) =>
                b.id === id ? { ...b, ...data } : b
            ),
        })),

    deleteSensor: (id) =>
        set((state) => ({
            sensors: state.sensors.filter((b) => b.id !== id),
        })),
}));
