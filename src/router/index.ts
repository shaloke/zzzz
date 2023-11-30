import { createRouter, createWebHistory } from "vue-router";

const routes: any = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
    },
  }
];

const router = createRouter({
  // history: createWebHashHistory('/hpjx/'),
  history: createWebHistory("/hpjx/"),
  routes,
});

export default router;
