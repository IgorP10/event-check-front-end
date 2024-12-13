export interface MarkAttendance {
    name: string;
    role?: string;
    congregation: string;
}

export interface Attendance extends MarkAttendance {
    event_id: number;
}
