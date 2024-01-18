import { defineStore } from 'pinia';
import { STATE } from '@/types/pinia/user';

export const userStore = defineStore('userInfo', {
  state: (): STATE => {
    return {
      userInfo: {
        avatar: '',
        factory: '',
        dept_full_name: '',
        dept_id: '',
        dept_name: '',
        name: '',
        phone: '',
        uploadUser: '',
        user_id: '',
      },
    };
  },
  getters: {},
  // action 支持 async/await 的语法，可以自行添加使用
  // action 里的方法相互之间调用，直接用 this 访问即可
  actions: {
    setUserInfo(val: any) {
      this.userInfo = val;
    },
  },
});
