import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import EventDetailsView from '@/views/EventDetailsView.vue';
import EventsListView from '@/views/EventsListView.vue';
import CreateEventView from '@/views/CreateEventView.vue';
import MarkAttendanceView from '@/views/MarkAttendanceView.vue';
import { useStore } from 'vuex';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/events/create',
    name: 'CreateEvent',
    component: CreateEventView,
    meta: { requiresAuth: true },
  },
  {
    path: '/events',
    name: 'Events',
    component: EventsListView,
    meta: { requiresAuth: true },
  },
  {
    path: '/events/:id',
    name: 'EventDetails',
    component: EventDetailsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/events/:id/attendance',
    name: 'MarkAttendance',
    component: MarkAttendanceView,
    meta: { requiresAuth: false },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuthenticated = store.getters['user/isAuthenticated'];

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
