import { create } from "zustand";
import type { Room } from "../models/Room";

interface RoomState {
    rooms: Room[];
}

export const useRoomStore = create<RoomState>(() => ({
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
}));
