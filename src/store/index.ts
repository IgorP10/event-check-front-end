import { createStore } from 'vuex'
import notifications from './modules/notifications'
import events from './modules/events'
import user from './modules/user'

export default createStore({
  modules: {
    notifications,
    events,
    user
  }
});
