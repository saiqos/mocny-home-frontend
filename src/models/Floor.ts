export interface Floor {
    id: string;
    buildingId: string;
    level: number;
    description?: string;
    notes?: string;
    architecturalBarriers?: string;
}
