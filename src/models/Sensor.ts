export type SensorType =
    | "SMOKE_DETECTOR"
    | "PANIC_BUTTON"
    | "TEMPERATURE_SENSOR";

export interface Sensor {
    id: string;
    buildingId?: string;
    floorId?: string;
    roomId?: string;
    externalSensorId: string;
    type: SensorType;
    locationDescription: string;
}
