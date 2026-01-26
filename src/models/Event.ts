export type EventType =
    | "SMOKE_DETECTED"
    | "BUTTON_PRESSED"
    | "TEMPERATURE_HIGH";

export type EventStatus = "NEW" | "IN_PROGRESS" | "RESOLVED";

export interface Event {
    id: string;
    sensorId: string;
    buildingId: string;
    reportedAt: string;
    location: string;
    eventType: EventType;
    status: EventStatus;
    emailSent: boolean;
}
