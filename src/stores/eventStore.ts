import { create } from "zustand";
import type { Event } from "../models/Event";

interface EventState {
    events: Event[];

    addEvent: (data: Omit<Event, "id">) => void;
    updateEvent: (id: string, data: Partial<Event>) => void;
    updateStatus: (id: string, status: Event["status"]) => void;
    deleteEvent: (id: string) => void;
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

    addEvent: (data) =>
        set((state) => ({
            events: [
                ...state.events,
                {
                    ...data,
                    id: crypto.randomUUID(),
                },
            ],
        })),

    updateEvent: (id, data) =>
        set((state) => ({
            events: state.events.map((event) =>
                event.id === id ? { ...event, ...data } : event
            ),
        })),

    updateStatus: (id, status) =>
        set((state) => ({
            events: state.events.map((event) =>
                event.id === id ? { ...event, status } : event
            ),
        })),

    deleteEvent: (id) =>
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        })),
}));