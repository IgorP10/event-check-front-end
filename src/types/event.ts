export interface CreateEvent {
    name: string;
    description?: string;
    date: string;
    time: string;
    location?: string;
}

export interface Event extends CreateEvent {
    id: number;
    creator: string;
    attendances: number;
}
