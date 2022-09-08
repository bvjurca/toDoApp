import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
