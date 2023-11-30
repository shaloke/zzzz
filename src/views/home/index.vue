<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import IconPersonal from "~icons/app/personal.svg";
import IconLsit from "~icons/app/list.svg";
import IconSend from "~icons/app/send.svg";
import MenuBtn from "@/components/MenuBtn.vue";
import Mine from "@/views/home/Mine.vue";
import List from "./List.vue";
import Transfer from "./Transfer.vue";
const tabs = ref<any>(1);

const menu = ref<any>(null);
const showmune = ref<boolean>(true);
const screenHeight = ref<any>();
const viewHeight = ref<any>(0);
// 处理android键盘弹出
const resizeFunc = () => {
  let resizeHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  if (resizeHeight < screenHeight.value) {
    showmune.value = false;
  } else {
    showmune.value = true;
  }
};
onMounted(() => {
  screenHeight.value =
    document.documentElement.clientHeight || document.body.clientHeight;
  window.addEventListener("resize", resizeFunc);
  viewHeight.value =
    window.innerHeight - menu.value.getBoundingClientRect().height;
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeFunc);
});
</script>

<template>
  <div class="main">
    <div
      class="main-view"
      :style="{ height: viewHeight + 'px' }"
      :key="viewHeight"
    >
      <v-window v-model="tabs">
        <v-window-item :value="1" :style="{ height: viewHeight + 'px' }"><Transfer></Transfer></v-window-item>
        <v-window-item :value="2" :style="{ height: viewHeight + 'px' }"><List></List></v-window-item>
        <v-window-item :value="3" :style="{ height: viewHeight + 'px' }"><Mine></Mine></v-window-item>
      </v-window>
    </div>
    <div class="main-menu" ref="menu" v-show="showmune">
      <v-tabs
        v-model="tabs"
        color="#5F9AA2"
        grow
        class="main-menu-tabs"
        height="4rem"
      >
        <v-tab :value="1">
          <MenuBtn title="中转">
            <template #icon><IconSend></IconSend></template>
          </MenuBtn>
        </v-tab>

        <v-tab :value="2">
          <MenuBtn title="列表">
            <template #icon><IconLsit></IconLsit></template>
          </MenuBtn>
        </v-tab>

        <v-tab :value="3">
          <MenuBtn title="我的">
            <template #icon><IconPersonal></IconPersonal></template>
          </MenuBtn>
        </v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100vw;
  position: relative;
  &-menu {
    width: 100%;
    position: fixed;
    bottom: 0;
    box-shadow: 0 2px 5px #c4c4c4;
  }
}
</style>
