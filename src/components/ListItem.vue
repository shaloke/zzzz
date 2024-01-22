<script setup lang="ts">
import { ref, PropType } from "vue";
import { globalSize } from "@/store/resize";
interface CARDINFO {
  id: string | number;
  sender: string;
  files: FILE[];
}
interface FILE {
  finish_time: string;
  id: number;
  name: string;
  predict_time: string;
  status: string;
  uni_name: string;
  url: string;
}
const gSize = globalSize();

const props = defineProps({
  // 是否能展开
  spread: {
    type: Boolean,
    default: () => {
      return false;
    },
    require: false,
  },
  // 是否能插队
  operate: {
    type: Boolean,
    default: () => {
      return false;
    },
    require: false,
  },
  // 能否撤销
  cancel: {
    type: Boolean,
    default: () => {
      return false;
    },
    require: false,
  },
  // 文件
  files: {
    type: Array as PropType<string[]>,
    default: () => {
      return [];
    },
    require: false,
  },
  // 开始时间
  startTime: {
    type: String,
    default: () => {
      return "yy-mm-dd hh-mm-ss";
    },
    require: false,
  },
  // 结束时间
  endTime: {
    type: String,
    default: () => {
      return "";
    },
    require: false,
  },
  // 接收人
  recivers: {
    type: String,
    default: () => {
      return "";
    },
    require: false,
  },
  cardinfo: {
    type: Object as PropType<CARDINFO>,
    default: () => {
      return {
        id: "999",
        sender: "xxx",
        files: [],
      };
    },
    require: true,
  },
  // 预计时间
  predictTime: {
    type: String,
    default: () => {
      return "";
    },
    require: false,
  },
});
const expand = ref<boolean>(props.spread ? true : false);
</script>

<template>
  <div class="listitem mb-2">
    <v-card>
      <template v-slot:title>
        <div class="listitem-top">
          <div>
            <v-chip
              class="mr-2"
              :size="gSize.chipSize"
              color="rgb(95, 154, 162)"
              variant="outlined"
            >
              <p class="listitem-top-id">ID：</p>
              <span>{{ props.cardinfo.id }}</span>
            </v-chip>
            <v-chip
              :size="gSize.chipSize"
              :color="
                props.cardinfo.files[0].status ==
                '文件已到达内网，等待发送OA邮件'
                  ? 'secondary'
                  : props.cardinfo.files[0].status == 'OA邮件已发送，请查收'
                  ? 'blue'
                  : 'orange'
              "
              variant="outlined"
              label
            >
              <span>{{
                props.cardinfo.files[0].status ==
                "文件已到达内网，等待发送OA邮件"
                  ? "文件已到达内网"
                  : props.cardinfo.files[0].status == "OA邮件已发送，请查收"
                  ? "OA邮件已发送"
                  : props.cardinfo.files[0].status
              }}</span>
            </v-chip>
          </div>
          <div class="">
            <v-btn
              v-if="props.spread"
              @click="expand = !expand"
              color="green"
              plain
              :ripple="false"
              variant="outlined"
              :size="gSize.buttonSize"
              >展开</v-btn
            >
          </div>
        </div>
      </template>
      <template v-slot:subtitle>
        <div class="listitem-user mt-2">
          <div class="listitem-user-send">
            <span>发送人：</span>
            <p>{{ props.cardinfo.sender }}</p>
          </div>
        </div>
      </template>
      <template v-slot:text>
        <div v-if="props.spread">
          <v-expand-transition>
            <div v-show="expand" class="listitem-content">
              <div class="listitem-content-filesname">
                <span>文件名：</span>
                <div class="listitem-content-filesname-list">
                  <p v-for="file in props.cardinfo.files" :key="file.id">
                    {{ file.name }}
                  </p>
                </div>
              </div>
              <div class="listitem-content-time">
                <span>发送时间：</span>
                <p>{{ props.startTime }}</p>
              </div>
              <div class="listitem-content-time">
                <span>{{
                  props.endTime === "" ? "预计完成时间:" : "完成时间:"
                }}</span>
                <p>
                  {{ props.endTime === "" ? props.predictTime : props.endTime }}
                </p>
              </div>
              <div class="listitem-content-rece">
                <span>接收人：</span>
                <div class="listitem-content-rece-list">
                  <!-- <p v-for="rec in props.recivers" :key="rec">{{ rec }}</p> -->
                  <p>{{ props.recivers }}</p>
                </div>
              </div>
            </div>
          </v-expand-transition>
        </div>
      </template>
      <div class="listitem-bot">
        <v-btn
          color="blue"
          v-if="props.operate"
          plain
          :ripple="false"
          variant="outlined"
          :size="gSize.buttonSize"
          style="margin-right: 0.25rem"
          >插队</v-btn
        >
        <v-btn
          color="#FF968F"
          v-if="props.cancel"
          plain
          :ripple="false"
          variant="outlined"
          :size="gSize.buttonSize"
          >撤销</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.listitem {
  &-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-id {
      font-weight: 600;
    }
  }

  &-user {
    display: flex;
    flex-direction: column;
    span {
      font-weight: 600;
    }
    &-send {
      display: flex;
    }
  }
  &-content {
    &-filesname {
      display: flex;
      span {
        white-space: nowrap;
      }
      &-list {
        display: flex;
        flex-wrap: wrap;
        color: blue;
      }
    }
    &-time {
      display: flex;
    }
    &-rece {
      display: flex;
      span {
        white-space: nowrap;
      }
      &-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
  &-bot {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
