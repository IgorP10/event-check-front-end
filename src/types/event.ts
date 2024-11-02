export interface Event {
    id: number;
    name: string;
    description?: string;
    date: string;
    time: string;
    location?: string;
    creator: string;
    attendances: number;
}