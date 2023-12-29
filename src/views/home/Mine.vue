<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import ToolBtn from "@/components/ToolBtn.vue";
import IconMail from "~icons/app/mail.svg";
import IconPersonalinfo from "~icons/app/personalinfo.svg";
import IconPower from "~icons/app/power.svg";
import ListItem from "@/components/ListItem.vue";
import IconBuilding from "~icons/app/building.svg";
import IconWork from "~icons/app/work.svg";
import {globalSize} from '@/store/resize'
const gSize = globalSize()
const mine = ref<any>(null);
const top = ref<any>(null);
const mid = ref<any>(null);
const bot = ref<any>(null);
const title = ref<any>(null);
const btoHeight = ref<any>();
const topx = ref<number>(0);
const midx = ref<number>(0);
const bot_margin_top = ref<number>(0);
const titlex = ref<number>(0);

const vertal = computed(() => {
  let a: number[] = [];
  for (let i = 0; i < 1000; i++) {
    a.push(i);
  }
  return a;
});

// 监听dom。如果变化则重新改变虚拟滚动高度
watch(top, () => {
  // top的height和margin-top
  const top_margin_top = window
    .getComputedStyle(top.value)
    .getPropertyValue("margin-top");
  topx.value =
    top.value.getBoundingClientRect().height +
    Number(top_margin_top.substring(0, top_margin_top.length - 2));
  // mid的height和margin-top
  const mid_margin_top = window
    .getComputedStyle(mid.value)
    .getPropertyValue("margin-top");
  midx.value =
    mid.value.getBoundingClientRect().height +
    Number(mid_margin_top.substring(0, mid_margin_top.length - 2));
  // bot的margin-top
  bot_margin_top.value = Number(
    window
      .getComputedStyle(mid.value)
      .getPropertyValue("margin-top")
      .substring(
        0,
        window.getComputedStyle(mid.value).getPropertyValue("margin-top")
          .length - 2
      )
  );
  // 标题高度
  titlex.value = title.value.getBoundingClientRect().height;
  btoHeight.value =
    window.innerHeight -
    topx.value -
    midx.value -
    bot_margin_top.value -
    titlex.value -
    64;
});
onMounted(() => {});
</script>

<template>
  <div class="mine" ref="mine">
    <div class="mine-top" ref="top">
      <div class="mine-top-text">
        <p class="mine-top-text-name">黄俊康</p>
        <p class="mine-top-text-info">
          <v-chip label color="blue" class="mr-2" variant="flat" :size="gSize.chipSize"
            ><v-icon :icon="IconBuilding"></v-icon>广州总部</v-chip
          >
          <v-chip label color="#5F9AA2" class="mr-2" variant="flat" :size="gSize.chipSize"
            ><v-icon :icon="IconWork"></v-icon>信息化中心</v-chip
          >
        </p>
      </div>
      <v-avatar image="../../../src/assets/imgs/head.jpg" :size="gSize.avatarSize"></v-avatar>
    </div>
    <div class="mine-mid" ref="mid">
      <!-- <div class="mine-mid-title">
        <p>服务</p>
      </div> -->
      <div class="mine-mid-tools">
        <ToolBtn title="个人信息" path="/personalinfo"
          ><IconPersonalinfo></IconPersonalinfo
        ></ToolBtn>
        <ToolBtn title="个人权限" path="/personalauthority"><IconPower></IconPower></ToolBtn>
        <ToolBtn title="意见箱" path="/complaintbox"><IconMail></IconMail></ToolBtn>
      </div>
    </div>
    <div class="mine-bot" ref="bot">
      <div class="mine-bot-title" ref="title">
        <p>个人传输列表</p>
        <v-btn density="compact" variant="tonal" color="pink">全部展开</v-btn>
      </div>
      <div class="mine-bot-list">
        <v-virtual-scroll
          :height="btoHeight"
          :items="vertal"
        >
          <template v-slot:default>
            <ListItem :operate="false" :spread="false" :cardinfo="{id:'334975',sender:'黄俊康',status:'文件传输中'}"></ListItem>
          </template>
        </v-virtual-scroll>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mine {
  width: 100%;
  height: 100%;
  // padding: 0 1.5rem;
  // background-color: rgba(255, 0, 0, 0.555);
  background: url("../../assets/imgs/sea.jpg");
  background-size: contain;
  &-top {
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-text {
      &-name {
        font-size: 2rem;
        font-weight: 600;
        color: #ffffff;
      }
      &-info {
        font-size: 1rem;
      }
    }
  }
  &-mid {
    // margin-top: 1.5rem;
    &-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.25rem 0;
      font-weight: 600;
    }
    &-tools {
      border-radius: 0.5rem 0.5rem 0 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      background: rgba(255, 255, 255, 0.5);
      color: #322c49;
    }
  }
  &-bot {
    background-color: #fffffff6;
    padding: 0 0.25rem;
    // padding-top: 1.5rem;
    &-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      font-weight: 600;
    }
    &-list {
    }
  }
}
</style>
