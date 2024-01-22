<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import ToolBtn from "@/components/ToolBtn.vue";
import IconMail from "~icons/app/mail.svg";
import IconPersonalinfo from "~icons/app/personalinfo.svg";
import IconPower from "~icons/app/power.svg";
import ListItem from "@/components/ListItem.vue";
import IconBuilding from "~icons/app/building.svg";
import IconWork from "~icons/app/work.svg";
import { globalSize } from "@/store/resize";
import { userStore } from "@/store/user";
import { queryStore } from "@/store/query";
import axios from "axios";

const QStore = queryStore();
const UStore = userStore();
const gSize = globalSize();
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
const virtual = ref<any>();
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
/**
 * 获取数据,接口为旧版接口
 */
const getList = () => {
  axios
    .get("https://www.gzcdgd.com/trans/uploadlist?size=100", {
      headers: {
        Authorization: "caa5366ab33c41aea76d76e502aa996f",
      },
    })
    .then((res) => {
      QStore.set100MyQueryList(res.data.data.data);
    });
};
// 没有数据才请求接口，避免重复请求
if (QStore.$state.my100Query.length <= 0) {
  getList();
}
onMounted(() => {});
</script>

<template>
  <div class="mine" ref="mine">
    <div class="mine-top" ref="top">
      <div class="mine-top-text">
        <p class="mine-top-text-name">{{ UStore.$state.userInfo.name }}</p>
        <p class="mine-top-text-info">
          <v-chip
            label
            color="blue"
            class="mr-2"
            variant="flat"
            :size="gSize.chipSize"
            ><v-icon :icon="IconBuilding"></v-icon
            >{{ UStore.$state.userInfo.factory }}</v-chip
          >
          <v-chip
            label
            color="#5F9AA2"
            class="mr-2"
            variant="flat"
            :size="gSize.chipSize"
            ><v-icon :icon="IconWork"></v-icon
            >{{ UStore.$state.userInfo.dept_name }}</v-chip
          >
        </p>
      </div>
      <v-avatar
        :image="UStore.$state.userInfo.avatar"
        :size="gSize.avatarSize"
      ></v-avatar>
    </div>
    <div class="mine-mid" ref="mid">
      <!-- <div class="mine-mid-title">
        <p>服务</p>
      </div> -->
      <div class="mine-mid-tools">
        <ToolBtn title="个人信息" path="/personalinfo"
          ><IconPersonalinfo></IconPersonalinfo
        ></ToolBtn>
        <ToolBtn title="个人权限" path="/personalauthority"
          ><IconPower></IconPower
        ></ToolBtn>
        <ToolBtn title="意见箱" path="/complaintbox"
          ><IconMail></IconMail
        ></ToolBtn>
      </div>
    </div>
    <div class="mine-bot" ref="bot">
      <div class="mine-bot-title" ref="title">
        <p>个人传输列表</p>
        <!-- <v-btn density="compact" variant="tonal" color="pink">全部展开</v-btn> -->
      </div>
      <div class="mine-bot-list">
        <v-virtual-scroll
          :height="btoHeight"
          :items="QStore.$state.my100Query"
          ref="virtual"
        >
          <template v-slot:default="{ item }">
            <ListItem
              :operate="false"
              :cancel="false"
              :spread="true"
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
  </div>
</template>

<style scoped lang="scss">
.mine {
  width: 100%;
  height: 100%;
  // padding: 0 1.5rem;
  background-color: #5f9aa240;
  // background: url("../../assets/imgs/sea.jpg");
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
        color: #2c2f39;
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
