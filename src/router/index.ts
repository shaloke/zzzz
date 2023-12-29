import { createRouter, createWebHistory } from "vue-router";

const routes: any = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/transfer",
        name: "Transfer",
        component: () => import("@/views/home/Transfer.vue"),
        meta: {
          title: "中转",
        },
      },
      {
        path: "/mine",
        name: "Mine",
        component: () => import("@/views/home/Mine.vue"),
        meta: {
          title: "我的",
        },
        children: [
          {
            path: "/personalinfo",
            name: "PersonalInfo",
            component: () => import("@/views/mine/PersonalInfo.vue"),
            meta: {
              title: "个人信息",
            },
          },
          {
            path: "/personalauthority",
            name: "PersonalAuthority",
            component: () => import("@/views/mine/PersonalAuthority.vue"),
            meta: {
              title: "个人权限",
            },
          },
          {
            path: "/complaintbox",
            name: "ComplaintBox",
            component: () => import("@/views/mine/ComplaintBox.vue"),
            meta: {
              title: "意见箱",
            },
          },
        ],
      },
      {
        path: "/list",
        name: "List",
        component: () => import("@/views/home/List.vue"),
        meta: {
          title: "列表",
        },
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHashHistory('/hpjx/'),
  history: createWebHistory("/hpjx/"),
  routes,
});

export default router;
