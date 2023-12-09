<script setup lang="ts">
import ListItem from "@/components/ListItem.vue";
import IconSearch from "~icons/app/search.svg";
import { ref, computed, onMounted, watch } from "vue";

const searchKey = ref<string>("");
const list = ref<any>(null);
const listsearch = ref<any>(null);
const listvirtual = ref<any>(null);
const search = () => {
  alert(123);
};

const vertal = computed(() => {
  let a: number[] = [];
  for (let i = 0; i < 1000; i++) {
    a.push(i);
  }
  return a;
});
const listvirtualHeight = ref<number>(0);
const resizeListHeight = () => {
  const listHeight = list.value.getBoundingClientRect().height;
  const listsearch_margin_top = window
    .getComputedStyle(listsearch.value)
    .getPropertyValue("margin-top");
  listvirtualHeight.value =
    listHeight -
    Number(
      listsearch_margin_top.substring(0, listsearch_margin_top.length - 2)
    ) -
    listsearch.value.getBoundingClientRect().height;
};
onMounted(() => {
  resizeListHeight();
});
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
        :append-icon="IconSearch"
        @click:append="search"
      ></v-text-field>
    </div>
    <v-virtual-scroll
      :height="listvirtualHeight + 'px'"
      :items="vertal"
      ref="listvirtual"
    >
      <template v-slot:default>
        <ListItem
          :operate="false"
          :spread="false"
          :cardinfo="{ id: '334975', sender: '黄俊康', status: '文件传输中' }"
        ></ListItem>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<style scoped lang="scss">
.list {
  height: 100%;
  padding: 0 1rem;
  // background-color: #f3f3f3;
  &-top {
    margin-top: 1rem;
  }
}
</style>
