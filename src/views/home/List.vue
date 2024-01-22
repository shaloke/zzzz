<script setup lang="ts">
import ListItem from "@/components/ListItem.vue";
import IconSearch from "~icons/app/search.svg";
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
// import { getQueryList } from "@/apis/apis";
import axios from "axios";
import { queryStore } from "@/store/query";
import { userStore } from "@/store/user";
const UStore = userStore();
const QStore = queryStore();
const searchKey = ref<string>("");
const list = ref<any>(null);
const listsearch = ref<any>(null);
const listvirtual = ref<any>(null);
const search = () => {
  alert(123);
};

const listvirtualHeight = ref<number>(0);
const resizeListHeight = () => {
  const listHeight = list.value.getBoundingClientRect().height;
  const listsearch_margin_top = window
    .getComputedStyle(listsearch.value)
    .getPropertyValue("margin-top");
  const listsearch_margin_bottom = window
    .getComputedStyle(listsearch.value)
    .getPropertyValue("margin-bottom");
  listvirtualHeight.value =
    listHeight -
    Number(
      listsearch_margin_top.substring(0, listsearch_margin_top.length - 2)
    ) -
    Number(
      listsearch_margin_bottom.substring(0, listsearch_margin_bottom.length - 2)
    ) -
    listsearch.value.getBoundingClientRect().height;
};
const getList = () => {
  const params: any = {
    size: 10,
    type: "all",
  };
  let url = "https://www.gzcdgd.com/trans/uploadlist";
  if (QStore.$state.queryList.length > 0) {
    params.uploadtime =
      QStore.$state.queryList[
        QStore.$state.queryList.length - 1
      ].records_create;
    url += `?uploadtime=${params.uploadtime}&size=${params.size}&type=${params.type}`;
  } else {
    url += `?size=${params.size}&type=${params.type}`;
  }
  axios
    .get(url, {
      headers: {
        Authorization: "caa5366ab33c41aea76d76e502aa996f",
      },
    })
    .then((res) => {
      QStore.setQueryList(res.data.data.data);
    });
};
if (QStore.$state.queryList.length <= 0) {
  getList();
}
const isGetBottom = () => {
  const el = listvirtual.value.$.vnode.component.vnode.el;
  let scrollTop = el.scrollTop; // 获取元素的滚动条顶部位置
  let scrollHeight = el.scrollHeight; // 获取元素的滚动条总高度
  let clientHeight = el.clientHeight; // 获取元素的可见高度
  if (scrollTop + clientHeight >= scrollHeight) {
    getList();
  }
};
onMounted(() => {
  resizeListHeight();
  listvirtual.value.$.vnode.component.vnode.el.addEventListener(
    "scroll",
    isGetBottom
  );
});
onBeforeUnmount(() => {
  listvirtual.value.$.vnode.component.vnode.el.removeEventListener(
    "scroll",
    isGetBottom
  );
}),
  watch(list, () => {
    resizeListHeight();
  });
</script>

<template>
  <div class="list" ref="list">
    <div class="list-top" ref="listsearch">
      <v-text-field
        v-model="searchKey"
        label="搜索"
        clearable
        variant="outlined"
        color="#5f9aa2"
        density="compact"
        :append-icon="IconSearch"
        @click:append="search"
      ></v-text-field>
    </div>
    <div class="list-content">
      <v-virtual-scroll
        :height="listvirtualHeight + 'px'"
        :items="QStore.$state.queryList"
        ref="listvirtual"
        style="padding: 0 0.25rem"
      >
        <template v-slot:default="{ item }">
          <ListItem
            :operate="false"
            :cancel="false"
            :spread="UStore.$state.userInfo.dept_id === 78 ? true : false"
            :startTime="item.records_create"
            :endTime="item.finish_time"
            :predictTime="item.predict_time"
            :cardinfo="{
              id: item.id,
              sender: item.send_user,
              files: item.files,
            }"
            :recivers="item.recv_user"
          ></ListItem>
        </template>
      </v-virtual-scroll>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list {
  height: 100%;
  background-color: #f3f3f3;
  &-top {
    background-color: #ffffff;
    padding-top: 1rem;
    margin-bottom: 0.45rem;
    padding: 1rem 0.25rem 0 0.25rem;
    box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
  }
  &-content {
    padding: 0 0.25rem;
  }
}
</style>
