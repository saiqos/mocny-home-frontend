import { create } from "zustand";
import type { Room } from "../models/Room";

interface RoomState {
    rooms: Room[];
    addRoom: (room: Room) => void;
    updateRoom: (id: string, data: Partial<Room>) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
    rooms: [
        {
            id: "r1",
            floorId: "f1",
            nameOrNumber: "Reception",
            orderOnFloor: 1,
            description: "Main entrance reception desk",
        },
        {
            id: "r2",
            floorId: "f1",
            nameOrNumber: "101",
            orderOnFloor: 2,
            description: "Administration office",
        },
        {
            id: "r3",
            floorId: "f2",
            nameOrNumber: "Conference Room",
            orderOnFloor: 1,
            description: "Large meeting room",
        },
    ],

    addRoom: (room) =>
        set((state) => ({
            rooms: [...state.rooms, room],
        })),

    updateRoom: (id, data) =>
        set((state) => ({
            rooms: state.rooms.map((r) =>
                r.id === id ? { ...r, ...data } : r
            ),
        })),
}));
