<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import IconFiles from "~icons/app/files.svg";
// import IconClose from "~icons/app/close.svg";
import IconClosefill from "~icons/app/closefill.svg";
import IconSend from "~icons/app/send.svg";
import type { TreeNode } from "element-plus/es/components/tree-v2/src/types";
import type { UploadUserFile, UploadProps, Action } from "element-plus";
import { ElMessage, ElMessageBox, ElTreeV2 } from "element-plus";
import ListItem from "@/components/ListItem.vue";
import { globalSize } from "@/store/resize";
import useWindowResize from "@/utils/useWindowResize";
import { getCloselyReceiver, uploadFiles } from "@/apis/apis";
import { receiversStore } from "@/store/receiver";
import IconClean from "~icons/app/clean.svg";
import IconUpload from "~icons/app/upload.svg";
import IconPicture from "~icons/app/picture.svg";
import IconText from "~icons/app/text.svg";
const RStore = receiversStore();

const screen = useWindowResize();
const gSize = globalSize();

const reciverHeight = computed(() => {
  if (screen.value < 350) {
    return "3rem";
  } else if (screen.value < 500 && screen.value > 350) {
    return "5rem";
  } else {
    return "5rem";
  }
});
const uploadRef = ref();
const filesList = ref<UploadUserFile[]>([]);
const postFilesUrl = ref<string>("https://www.gzcdgd.com/trans/upload");
const compression = ref<string | number>("0");
const listType = ref<string>("text");
const edata = computed(() => {
  interface EDATA {
    recv_users: any;
    compression: any;
  }
  const params: EDATA = {
    recv_users: JSON.stringify(RStore.$state.receivers),
    compression: 0,
  };
  if (compression.value !== "") {
    params.compression = compression.value;
  }
  return params;
});
const list = ref<any>([]);
const beforeUpload: UploadProps["beforeUpload"] = (rawFile: any) => {
  list.value.push(rawFile);
  console.log(rawFile);
  return false;
};
const submitUpload = () => {
  // TODO：在这里使用定时器来请求接口并不好，待优化
  setTimeout(() => {
    let formData: any = new FormData();
    if (compression.value !== "") {
      formData.append("compression", compression.value);
    }
    formData.append("recv_users", JSON.stringify(RStore.$state.receivers));
    for (let i = 0; i < list.value.length; i++) {
      formData.append("files", list.value[i]);
    }
    uploadFiles(formData)
      .then((res) => {
        if (res.status !== "yes") {
          ElMessage({
            message: res.desc,
            type: "error",
          });
        } else {
          ElMessage({
            message: res.desc,
            type: "success",
          });
        }
        list.value = [];
      })
      .catch(() => {
        ElMessage({
          message: "上传失败，请联系信息化中心",
          type: "error",
        });
        list.value = [];
      });
  }, 500);
  uploadRef.value.submit();
};
const changeView = () => {
  if (listType.value === "text") {
    listType.value = "picture";
  } else {
    listType.value = "text";
  }
};

const drawer = ref<any>(false);

const botHeight = ref<number>(0);
const transfer = ref<any>(null);
const transfertop = ref<any>(null);
const transfermid = ref<any>(null);
const transferbot = ref<any>(null);
const query = ref("");
const treeRef = ref<InstanceType<typeof ElTreeV2>>();
const treeData = ref<any>();
const treeProps = {
  value: "id", // 唯一标识
  label: "label", // 节点标签
  children: "children", // 子节点
};
const defaultCheck = ref<any>([])
const onQueryChanged = (query: string) => {
  // TODO: fix typing when refactor tree-v2
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  treeRef.value!.filter(query);
};
const filterMethod = (query: string, node: TreeNode) => {
  return node.label!.includes(query);
};

const addReceiver = () => {
  console.log(treeRef.value!.getCheckedNodes());
  RStore.updateReceivers(treeRef.value!.getCheckedNodes());
};
/**
 * 抽屉人员名单列表高度
 */
const namelistHeight = ref<number>(300);
const drawerOpend = () => {
  const bodyHeight = (
    document.getElementsByClassName("el-drawer__body")[0] as any
  ).offsetHeight;
  namelistHeight.value = bodyHeight - 100;
};

/**
 * 删除接收人
 */
const delReciver = (id: string) => {
  if (id === "all") {
    ElMessageBox.alert("是否删除所有接收人？", "确认框", {
      confirmButtonText: "确认",
      callback: (action: Action) => {
        if (action === "confirm") {
          RStore.$state.recv_user = [];
          ElMessage({
            type: "info",
            message: `删除成功`,
          });
        } else {
          ElMessage({
            type: "info",
            message: `取消删除`,
          });
        }
      },
    });
  } else {
    ElMessageBox.alert("是否删除所选接收人？", "确认框", {
      confirmButtonText: "确认",
      callback: (action: Action) => {
        if (action === "confirm") {
          RStore.$state.recv_user.forEach((item, index) => {
            if (item.user_id === id) {
              RStore.$state.recv_user.splice(index, 1);
            }
          });
          ElMessage({
            type: "info",
            message: `删除成功`,
          });
        } else {
          ElMessage({
            type: "info",
            message: `取消删除`,
          });
        }
      },
    });
  }
};
/**
 * 获取接收人
 */
const getReceiver = async () => {
  if (RStore.$state.freq_user.length === 0) {
    getCloselyReceiver().then((res) => {
      RStore.setFreqUser(res.data.freq_user);
      RStore.setRecvUser(res.data.recv_user);
      treeData.value = RStore.$state.tree_data;//defaultCheck
      RStore.$state.recv_user.forEach((it)=>{
        defaultCheck.value.push(it.user_id)
      })
    });
  }
};
getReceiver()
const openDrawer = () => {
  drawer.value = !drawer.value;
};
onMounted(() => {

});
</script>

<template>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    size="100%"
    show-close
    :modal="false"
    @open="drawerOpend"
  >
    <div class="drawer">
      <div class="drawer-top">
        <!-- <v-btn variant="text" :icon="IconClose" @click="drawer = false"></v-btn> -->
      </div>
      <div class="drawer-mid">
        <el-input
          v-model="query"
          placeholder="请输入关键字"
          @input="onQueryChanged"
        />
        <el-tree-v2
          ref="treeRef"
          show-checkbox
          :data="treeData"
          :props="treeProps"
          :filter-method="(filterMethod as any)"
          :height="namelistHeight"
          :default-checked-keys="defaultCheck"
        />
        <el-button @click="addReceiver">添加</el-button>
      </div>
    </div>
  </el-drawer>
  <div class="transfer" ref="transfer">
    <div class="transfer-top" ref="transfertop">
      <div class="transfer-top-btns">
        <v-btn
          :prepend-icon="IconSend"
          variant="tonal"
          @click="openDrawer"
          color="#5F9AA2"
          :size="gSize.buttonSize"
        >
          选择接收用户
        </v-btn>
        <el-button
          :size="gSize.buttonSize"
          @click="delReciver('all')"
          :icon="IconClean"
          color="#626aef"
          >清空</el-button
        >
      </div>
      <div
        class="transfer-top-reciver"
        :style="{
          maxHeight: reciverHeight,
          gap: screen < 350 ? '0.25rem' : '.5rem',
        }"
      >
        <div
          class="transfer-top-reciver-item"
          v-for="i in RStore.$state.receivers"
          :key="i.user_id"
        >
          <v-chip label :size="gSize.chipSize">
            <p class="transfer-top-reciver-item-p">{{ i.user_name }}</p>
            <v-icon
              end
              :icon="IconClosefill"
              @click="delReciver(i.user_id)"
            ></v-icon>
          </v-chip>
        </div>
      </div>
    </div>
    <div class="transfer-mid" ref="transfermid">
      <div class="transfer-mid-sub">
        <el-button
          class="ml-2"
          :size="gSize.buttonSize"
          type="primary"
          @click="changeView"
        >
          <IconPicture
            v-show="listType === 'picture'"
            style="font-size: 16px"
          ></IconPicture>
          <IconText
            v-show="listType === 'text'"
            style="font-size: 16px"
          ></IconText>
        </el-button>
        <el-button
          color="#626aef"
          :size="gSize.buttonSize"
          :icon="IconUpload"
          @click="submitUpload"
        >
          提交
        </el-button>
      </div>

      <el-upload
        ref="uploadRef"
        :with-credentials="true"
        :auto-upload="false"
        :action="postFilesUrl"
        :file-list="filesList"
        :list-type="listType"
        :data="edata"
        :multiple="true"
        name="files"
        :limit="10"
        :before-upload="beforeUpload"
      >
        <v-btn
          :prepend-icon="IconFiles"
          variant="tonal"
          color="#5F9AA2"
          :size="gSize.buttonSize"
        >
          上传文件
        </v-btn>

        <template #tip>
          <div class="el-upload__tip">文件大小不能超过10M</div>
        </template>
      </el-upload>
    </div>
    <div class="transfer-bot" :key="botHeight" ref="transferbot">
      <ListItem :operate="true" :cancel="true"></ListItem>
      <ListItem :operate="true" :cancel="true"></ListItem>
      <ListItem :operate="true" :cancel="true"></ListItem>
      <ListItem :operate="true" :cancel="true"></ListItem>
      <ListItem :operate="true" :cancel="true"></ListItem>
      <ListItem :operate="true" :cancel="true"></ListItem>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  &-top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &-mid {
  }
}
.title {
  color: #300000;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.transfer {
  width: 100vw;
  height: 100%;
  background-color: #f3f3f3;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  &-top {
    height: auto;
    max-height: 10rem;
    background: #ffffff;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 5px rgba(45, 47, 51, 0.2);
    padding: 0.5rem 0.25rem;
    border-radius: 5px;
    &-btns {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 0.5rem;
    }
    &-reciver {
      overflow-y: scroll;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 4fr));
      // gap: 0.5rem;
      margin-bottom: 1rem;
      &-item {
        text-align: center;
        &-p {
          width: 3rem;
          white-space: nowarp;
          overflow: hidden;
        }
      }
    }
  }
  &-mid {
    background: #ffffff;
    overflow-y: scroll;
    border-radius: 5px;
    box-shadow: 0 1px 5px rgba(45, 47, 51, 0.2);
    padding: 0.5rem 0.25rem;
    position: relative;
    max-height: 10rem;
    &-sub {
      position: absolute;
      top: 0.5rem;
      right: 0.25rem;
    }
    ::v-deep(.el-icon--close) {
      display: flex;
    }
  }
  &-bot {
    padding-top: 0.5rem;
    flex: 1;
    overflow: auto; // 如果内容过多，可以滚动
  }
}
</style>
