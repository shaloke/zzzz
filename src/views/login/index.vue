<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { bindUserInfo } from "@/apis/apis";
import router from "@/router";
const valid = ref<boolean>(false);
const phoneNumber = ref<string>("");
const phoneRules = ref<any>([
  (value) => {
    if (value) return true;
    return "手机号不能为空";
  },
  (value) => {
    let phoneReg = /^1[3-9]\d{9}$/;
    if (phoneReg.test(value)) return true;
    return "非法手机号";
  },
]);
const factory = ref<string>("");
const factoryRules = ref<any>([
  (value) => {
    if (value) return true;
    return "厂区不能为空";
  },
]);
const loading = ref<boolean>(false);
const login = async () => {
  const params = {
    factory: "广州总部",
    phone: "15363668260",
  };
  bindUserInfo(params).then((res) => {
    console.log(res);
  });
  let phoneReg = /^1[3-9]\d{9}$/;
  if (
    phoneReg.test(phoneNumber.value) &&
    phoneNumber.value !== "" &&
    factory.value !== ""
  ) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } else {
    router.push("/index");
  }
};
const showcdgd = ref<boolean>(true);
const screenHeight = ref<any>();

// 处理android键盘弹出
const resizeFunc = () => {
  let resizeHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  if (resizeHeight < screenHeight.value) {
    showcdgd.value = false;
  } else {
    showcdgd.value = true;
  }
};
onMounted(() => {
  screenHeight.value =
    document.documentElement.clientHeight || document.body.clientHeight;
  window.addEventListener("resize", resizeFunc);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeFunc);
});
</script>

<template>
  <div class="main">
    <div class="main-top">
      <!-- <div class="main-top-left"></div>
      <div class="main-top-leftc"></div>
      <div class="main-top-rightc"></div>
      <div class="main-top-right"></div> -->
    </div>
    <div class="main-mid">
      <div class="main-mid-title">
        <p>欢迎使用自助中转</p>
      </div>
      <div class="main-mid-form">
        <v-form
          v-model="valid"
          validate-on="submit lazy"
          @submit.prevent="login"
        >
          <v-text-field
            class="main-mid-form-input"
            v-model="factory"
            :rules="factoryRules"
            label="厂区"
            required
            hide-details
            type="password"
          ></v-text-field>
          <v-text-field
            class="main-mid-form-input"
            v-model="phoneNumber"
            :rules="phoneRules"
            label="手机号"
            required
            hide-details
          ></v-text-field>

          <v-btn
            :loading="loading"
            block
            text="登录"
            type="submit"
            color="#5F9AA2"
            density="default"
            min-height="50"
          ></v-btn>
        </v-form>
      </div>
    </div>
    <div class="main-btm" v-show="showcdgd">
      <p>©广州长岛光电机械厂</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
$w: 47%;
.main {
  height: 100vh;
  width: 100vw;
  &-top {
    height: 40%;
    width: 100%;
    background-image: url("@/assets/imgs/16.png");
    background-size: cover;
    position: relative;
    &-left {
      background-color: #ffffff;
      height: 20px;
      width: $w;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    &-right {
      background-color: #ffffff;
      height: 20px;
      width: $w;
      position: absolute;
      right: 0;
      bottom: 0;
    }
    &-leftc {
      width: calc(50% - $w);
      height: 20px;
      background-color: #ffffff;
      clip-path: polygon(0 0, 0 100%, 100% 100%);
      position: absolute;
      left: $w;
      bottom: 0;
    }
    &-rightc {
      width: calc(50% - $w);
      height: 20px;
      background-color: #ffffff;
      clip-path: polygon(0 100%, 100% 100%, 100% 0);
      position: absolute;
      right: $w;
      bottom: 0;
    }
  }
  &-mid {
    margin-top: 24px;
    padding: 0 12px;
    &-title {
      font-size: 1.5rem;
      text-align: center;
    }
    &-form {
      margin-top: 24px;
      &-input {
        margin-bottom: 24px;
      }
    }
  }
  &-btm {
    width: 100vw;
    text-align: center;
    position: fixed;
    bottom: 0;
  }
}
</style>
