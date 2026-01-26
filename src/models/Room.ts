export interface Room {
    id: string;
    floorId: string;
    nameOrNumber: string;
    orderOnFloor: number;
    description?: string;
}
