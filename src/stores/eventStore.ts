import { create } from "zustand";
import type { Event } from "../models/Event";

interface EventState {
    events: Event[];
    updateStatus: (id: string, status: Event["status"]) => void;
}

export const useEventStore = create<EventState>((set) => ({
    events: [
        {
            id: "e1",
            sensorId: "s1",
            buildingId: "1",
            reportedAt: new Date().toISOString(),
            location: "Floor 1, corridor near room 105",
            eventType: "SMOKE_DETECTED",
            status: "NEW",
            emailSent: true,
        },
        {
            id: "e2",
            sensorId: "s2",
            buildingId: "1",
            reportedAt: new Date().toISOString(),
            location: "Ground floor reception",
            eventType: "BUTTON_PRESSED",
            status: "RESOLVED",
            emailSent: true,
        },
    ],

    updateStatus: (id, status) =>
        set((state) => ({
            events: state.events.map((e) =>
                e.id === id ? { ...e, status } : e
            ),
        })),
}));
