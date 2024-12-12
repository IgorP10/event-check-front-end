import { createStore } from 'vuex'
import notifications from './modules/notifications'
import events from './modules/events'
import user from './modules/user'
import attendance from './modules/attendance'

export default createStore({
  modules: {
    notifications,
    events,
    user,
    attendance,
  }
});
