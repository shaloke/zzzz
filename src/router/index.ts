import { createRouter, createWebHistory } from "vue-router";
import { userStore } from '@/store/user';
import { getToken, setToken } from '@/utils/auth';
import { no } from '@/utils/msg';
import { getUserInfo } from '@/apis/apis';

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
    path: "/index",
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
      },
      {
        path: "/list",
        name: "List",
        component: () => import("@/views/home/List.vue"),
        meta: {
          title: "列表",
        },
      },
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
];

const router = createRouter({
  // history: createWebHashHistory('/hpjx/'),
  history: createWebHistory("/hpjx/"),
  routes,
});

// 路由守卫
router.beforeEach((to, _from, next) => {
  const UStore = userStore();
  if (to.path === '/login' || to.path === '/error') {
    next();
  } else {
    let token = getToken();
    if (!token) {
      setToken(to.query.token);
      token = getToken();
    }
    // 有token说明已经认证了微信，后台已经给了token给用户
    // alert(JSON.stringify(to.query.token))
    if (token) {
      
      // pinia里面有用户数据，说明已经登录通过过厂里的用户认证，厂里有这个人，路由允许放行
      if (UStore.$state.userInfo.user_id !== '') {
        //如果有数据，放行
        next();
      } else {
        // 再次请求接口，看看是否能获取到用户数据，可以则放行
        getUserInfo().then((res) => {
          if (res.status === 'success') {
            UStore.setUserInfo(res.data);
            console.log(UStore.$state.userInfo)
            next();
          } else {
            next('/login');
          }
        });
      }
    } else {
      no('请通过公众号打开页面！');
    }
    // window.document.title = to.meta.title || ''
    //   if (to.path === '/login') return next();
    //   const session = window.sessionStorage.getItem('Authorization');
    //   if (!session) return next('/login');]
  }
});

export default router;
