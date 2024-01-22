<script setup lang="ts">
import router from "@/router";
import {globalSize} from '@/store/resize'

const gSize = globalSize()

const props = defineProps({
  title: {
    type: String,
    default: () => {
      return "";
    },
  },
  background: {
    type: String,
    default: () => {
      return "";
    },
  },
  path: {
    type: String,
    default: () => {
      return "";
    },
  },
});
const routerGo = () =>{
  router.push(props.path)
}
</script>

<template>
  <!-- <div class="toolbtn">
    <slot></slot>
    <p>{{ props.title }}</p>
  </div> -->
  <div class="toolbtn" :style="{background:background}" @click="routerGo">
    <v-btn variant="text" :width="gSize.toolBtnSize" :height="gSize.toolBtnSize">
      <div class="toolbtn-v" :style="{fontSize:gSize.toolBtnTextSize}">
        <slot></slot>
      </div>
    </v-btn>
    <p class="toolbtn-p" :style="{fontSize:gSize.toolPSize}">{{ props.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.toolbtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-v {
    // font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-p {
    // font-size: 1.25rem;
  }
}
</style>
