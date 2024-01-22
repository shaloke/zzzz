import { defineStore } from 'pinia';
import { QUERY, STATE } from '@/types/pinia/query';
export const queryStore = defineStore('queryInfo', {
  state: (): STATE => {
    return {
      queryList: [],
      myQuery: [],
      my100Query: [],
    };
  },
  actions: {
    setQueryList(val: Array<QUERY>) {
      val.forEach((item: QUERY) => {
        if (item.hasOwnProperty('finish_time')) {
          item.finish_time = item.finish_time.slice(
            0,
            item.finish_time.indexOf('.')
          );
        }
        item.records_create = item.records_create.slice(
          0,
          item.records_create.indexOf('.')
        );
        this.queryList.push(item);
      });
    },
    clearQueryList() {
      this.queryList = [];
    },
    setMyQueryList(val: Array<QUERY>) {
      this.myQuery = val;
    },
    set100MyQueryList(val: Array<QUERY>){
      this.my100Query = val;
    }
  },
});
