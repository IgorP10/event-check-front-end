export interface MarkAttendance {
    name: string;
    role?: string;
    congragation: string;
}

export interface Attendance extends MarkAttendance {
    id: number;
}
