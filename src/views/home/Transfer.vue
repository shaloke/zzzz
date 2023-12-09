<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import IconFiles from "~icons/app/files.svg";
// import IconClose from "~icons/app/close.svg";
import IconClosefill from "~icons/app/closefill.svg";
import IconSend from "~icons/app/send.svg";
import { ElTreeV2 } from "element-plus";
import type { TreeNode } from "element-plus/es/components/tree-v2/src/types";
import type { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import ListItem from "@/components/ListItem.vue";
import { globalSize } from "@/store/resize";
import useWindowResize from "@/utils/useWindowResize";

const screen = useWindowResize();
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}
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
const fileList = ref<UploadUserFile[]>([
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};

const drawer = ref<any>(false);

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`;
};

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = "node"
): Tree[] => {
  let id = 0;
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
      const nodeKey = getKey(key, ++id);
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      };
    });
};
const botHeight = ref<number>(0);
const transfer = ref<any>(null);
const transfertop = ref<any>(null);
const transfermid = ref<any>(null);
const transferbot = ref<any>(null);
const query = ref("");
const treeRef = ref<InstanceType<typeof ElTreeV2>>();
const data = createData(4, 30, 5);
const props = {
  value: "id",
  label: "label",
  children: "children",
};

const onQueryChanged = (query: string) => {
  // TODO: fix typing when refactor tree-v2
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  treeRef.value!.filter(query);
};
const filterMethod = (query: string, node: TreeNode) => {
  return node.label!.includes(query);
};

const delReciver = () => {
  ElMessageBox.alert("是否删除所选接收人？", "确认框", {
    confirmButtonText: "确认",
    callback: (action: Action) => {
      ElMessage({
        type: "info",
        message: `${action}`,
      });
    },
  });
};

// 底部传输列表显示区域高度自适应
const robotizationBotHeight = () => {
  const transfertop_margin_bottom = window
    .getComputedStyle(transfertop.value)
    .getPropertyValue("margin-bottom");
  const transfermid_margin_bottom = window
    .getComputedStyle(transfermid.value)
    .getPropertyValue("margin-bottom");
  const transfer_padding_top = window
    .getComputedStyle(transfer.value)
    .getPropertyValue("padding-top");
  const transfer_padding_bottom = window
    .getComputedStyle(transfer.value)
    .getPropertyValue("padding-bottom");
  const transferbot_margin_top = window
    .getComputedStyle(transferbot.value)
    .getPropertyValue("margin-top");
  botHeight.value =
    transfer.value.getBoundingClientRect().height -
    Number(
      transfertop_margin_bottom.substring(
        0,
        transfertop_margin_bottom.length - 2
      )
    ) -
    Number(
      transfermid_margin_bottom.substring(
        0,
        transfermid_margin_bottom.length - 2
      )
    ) -
    Number(transfer_padding_top.substring(0, transfer_padding_top.length - 2)) -
    Number(
      transfer_padding_bottom.substring(0, transfer_padding_bottom.length - 2)
    ) -
    Number(
      transferbot_margin_top.substring(0, transferbot_margin_top.length - 2)
    ) -
    transfertop.value.getBoundingClientRect().height -
    transfermid.value.getBoundingClientRect().height;
};
onMounted(() => {
  robotizationBotHeight();
});
watch(transfer, () => {
  robotizationBotHeight();
});
</script>

<template>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    size="100%"
    show-close
    :modal="false"
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
          :data="data"
          :props="props"
          :filter-method="(filterMethod as any)"
          :height="208"
        />
      </div>
    </div>
  </el-drawer>
  <div class="transfer" ref="transfer">
    <div
      class="transfer-top"
      ref="transfertop"
      :style="{ height: gSize.transferBoxSize }"
    >
      <div class="transfer-top-btns">
        <v-btn
          :prepend-icon="IconSend"
          variant="tonal"
          @click="drawer = !drawer"
          color="#5F9AA2"
          :size="gSize.buttonSize"
        >
          选择接收用户
        </v-btn>
        <v-btn :size="gSize.buttonSize" variant="tonal">清空</v-btn>
      </div>
      <div class="transfer-top-reciver" :style="{height:reciverHeight,gap:screen < 350 ? '0.25rem' : '.5rem'}">
        <div class="transfer-top-reciver-item" v-for="i in 10" :key="i">
          <v-chip label :size="gSize.chipSize">
            <p class="transfer-top-reciver-item-p">黄俊康{{ i }}</p>
            <v-icon end :icon="IconClosefill" @click="delReciver"></v-icon>
          </v-chip>
        </div>
      </div>
    </div>
    <div
      class="transfer-mid"
      ref="transfermid"
      :style="{ height: gSize.transferBoxSize }"
    >
      <v-btn class="transfer-mid-sub" :size="gSize.buttonSize" variant="tonal">
        提交
      </v-btn>
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
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
    <div
      class="transfer-bot"
      :style="{ height: botHeight + 'px' }"
      :key="botHeight"
      ref="transferbot"
    >
      <ListItem></ListItem>
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
  // background-color: #000;
  height: 100%;
  // background: url("../../assets/imgs/sea.jpg");
  // background-size: contain;
  background-color: #f3f3f3;
  padding: 0.75rem;
  &-top {
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
    &-sub {
      position: absolute;
      top: 0.5rem;
      right: 0.25rem;
    }
  }
  &-bot {
    background-color: #fff;
    padding: 0.5rem 0;
    border-radius: 5px;
    box-shadow: 0 1px 5px rgba(45, 47, 51, 0.2);
    margin-top: 0.5rem;
  }
}
</style>
