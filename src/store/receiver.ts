import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { RECEIVERS, STATE } from "@/types/pinia/receiver";
import {
  // uniqWith as _uniqWith,
  isEqual as _isEqual,
  omit as _omit,
} from "lodash";

export const receiversStore = defineStore("receiversInfo", {
  state: (): STATE => {
    return {
      recv_user: [],
      freq_user: [],
      receivers: [],
      search_result: [],
      tree_data: [],
    };
  },
  getters: {},
  // action 支持 async/await 的语法，可以自行添加使用
  // action 里的方法相互之间调用，直接用 this 访问即可
  actions: {
    // 常用接收人
    setRecvUser(val: Array<RECEIVERS>) {
      const temp: Array<RECEIVERS> = val;
      val.forEach((item, index) => {
        if (item.hasOwnProperty("count")) {
          temp[index] = _omit(item, "count");
        }
      });
      this.recv_user = temp;
      this.receivers = temp;
    },
    // 本部门的人，用于首次渲染树
    setFreqUser(val: Array<RECEIVERS>) {
      const temp: Array<RECEIVERS> = val;
      val.forEach((item, index) => {
        if (item.hasOwnProperty("count")) {
          temp[index] = _omit(item, "count");
        }
      });
      this.freq_user = temp;
      this.setTreeData(val);
    },
    // 更新接收人
    updateReceivers(val: Array<any>) {
      // 处理原数组
      this.receivers.forEach((item, index) => {
        if (item.hasOwnProperty("count")) {
          this.receivers[index] = _omit(item, "count");
        }
      });
      // 处理参数
      val.forEach((item) => {
        if (item.hasOwnProperty("html_name")) {
          item = _omit(item, "html_name");
        }
        if (item.hasOwnProperty("label")) {
          item = _omit(item, "label");
        }
        // 避免重复选择
        let bool: boolean = false;
        for (let i = 0; i < this.receivers.length; i++) {
          if (_isEqual(item, this.receivers[i])) {
            bool = true;
          }
        }
        if (!bool) {
          this.receivers.push(item);
        }
      });
    },
    // 删除接收人
    removeReceiver(val: RECEIVERS) {
      if (this.receivers.length > 1) {
        for (let i = 0; i < this.receivers.length; i++) {
          if (val.user_id === this.receivers[i].user_id) {
            this.receivers.splice(i, 1);
            return;
          }
        }
      } else {
        ElMessage({
          message: "接收人不能少于1个",
          type: "warning",
        });
        return;
      }
    },
    // 搜索结果
    setSearchResult(val: Array<RECEIVERS>) {
      this.search_result = val;
    },
    // 搜索后处理树
    setTreeData(val: Array<RECEIVERS>) {
      const formatSearchResult = (val: Array<RECEIVERS>) => {
        const result = val;
        const arr: any[] = [];
        const endRes: RECEIVERS[] = [];
        result.forEach((ele: RECEIVERS) => {
          const obj = {
            label: ele["dept_full_name"],
            id: ele["dept_id"],
            key: ele["dept_id"],
          };
          const isE: boolean = arr.find((e: any) => e.id === obj.id);
          if (!isE) {
            arr.push(obj);
          }
        });
        for (let i = 0; i < arr.length; i++) {
          const treeData: any = {
            label: "",
            id: 0,
            children: [],
            key: '',
          };
          if (arr[i].label !== null) {
            treeData.label = arr[i].label;
            treeData.id = arr[i].id;
            treeData.key = arr[i].id;
          } else {
            treeData.label = "未知科室";
            treeData.id = 999;
          }
          for (let j = 0; j < result.length; j++) {
            if (result[j]["dept_full_name"] === arr[i].label) {
              result[j]["label"] = result[j]["user_name"];
              result[j]["id"] = result[j]["user_id"];
              treeData.children.push(result[j]);
            }
          }
          endRes.push(treeData);
        }
        return endRes;
      };
      this.tree_data = formatSearchResult(val);
    },
  },
});
