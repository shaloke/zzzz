<script setup lang="ts">
import { ref, computed } from "vue";
import IconMail from "~icons/app/mail.svg";
import IconStar from "~icons/app/star.svg";
const rate = ref<number>(0);
const rateColors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);
const msgText = ref<string>("");
const rateText = computed(() => {
  if (rate.value === 0) {
    return "欢迎评分";
  } else if (rate.value === 1) {
    return "真的只有1分吗😱";
  } else if (rate.value === 2) {
    return "还能再高一点吗👀";
  } else if (rate.value === 3) {
    return "我们会再接再厉✊";
  } else if (rate.value === 4) {
    return "感谢您对我们的认可😀";
  } else if (rate.value === 5) {
    return "谢谢你给予我们如此高的评价🫰";
  }
});
/**
 * 提交评价和意见函数
 */
const submitInfo = () => {
  const params = {
    score: rate.value,
    msg: msgText.value,
  };
  alert(params);
};
</script>

<template>
  <div ref="complaintbox" class="complaintbox">
    <div class="complaintbox-banner1">
      <v-banner
        lines="two"
        :icon="IconStar"
        color="deep-purple-accent-4"
        class="my-4"
      >
        <v-banner-text
          >如果你觉得自助中转对你提供了帮助，请给我们的软件打个分吧！</v-banner-text
        >
      </v-banner>
      <div class="complaintbox-rate">
        <span>{{ rateText }}</span>
        <el-rate v-model="rate" :colors="rateColors" :max="5" />
      </div>
    </div>
    <div class="complaintbox-banner2">
      <v-banner lines="two" :icon="IconMail" color="#337ecc" class="my-4">
        <v-banner-text>
          如果你觉得我们的软件有哪些不足的地方，也欢迎留下你的建议，我们会持续改进！
        </v-banner-text>
      </v-banner>
      <v-textarea
        label="写下你的建议"
        bg-color="#5f9aa220"
        v-model="msgText"
      ></v-textarea>
    </div>
    <v-btn
      color="rgb(95, 154, 162)"
      class="complaintbox-submit"
      @click="submitInfo"
    >
      提交
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
.complaintbox {
  position: relative;
  &-rate {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-submit {
    position: absolute;
    right: 1rem;
  }
}
</style>
