import { Notification } from './notification';
import { EventsState } from '@/store/modules/events';
import { UserState } from '@/store/modules/user';

export interface RootState {
    notifications: Notification;
    events: EventsState;
    user: UserState;
}
