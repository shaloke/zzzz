<script setup lang="ts">
// import { ref } from "vue";
import { userStore } from "@/store/user";

const UStore = userStore();
</script>

<template>
  <div class="card">
    <div class="mengban"></div>
    <div class="card-top">
      <img src="../assets/imgs/hpjx.png" class="hpjx" />
      <div class="card-top-line">
        <p class="title">黄埔军械修理厂</p>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <div class="card-mid">
      <div class="card-mid-left">
        <div class="content">
          <div class="card-mid-left-name">
            <strong>黄俊康</strong>
          </div>
          <div class="card-mid-left-factory">
            <span>厂区：</span>
            <strong>广州总部</strong>
          </div>
          <div class="card-mid-left-department">
            <span>部门：</span>
            <strong>信息分部</strong>
          </div>
          <div class="card-mid-left-number">
            <span>手机号：</span>
            <strong>15363668260</strong>
          </div>
        </div>
      </div>
      <div class="card-mid-right">
        <el-avatar
          shape="square"
          :size="100"
          fit="cover"
          :src="UStore.$state.userInfo.avatar"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  border-radius: 10px;
  background: url("../assets/imgs/16.png");
  background-size: 100%;
  box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
  position: relative;
  .mengban{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #ffffff9f;
  }
  &-top {
    height: 25%;
    position: relative;
    &-line {
      position: absolute;
      width: 100%;
      bottom: 0;
      text-align: right;
    }
    .hpjx {
      position: absolute;
      max-height: 100%;
      height: auto;
      padding: 2px;
      left: 20px;
      z-index: 111;
    }
    .title {
      font-size: 20px;
      letter-spacing: 20px;
      color: red;
      text-shadow: 1px 1px 0 #000000;
    }
    .line {
      width: 100%;
      border-top: 1px solid blue;
      margin-bottom: 2px;
      position: relative;
    }
  }

  &-mid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 75%;
    padding: 5% 5% 3% 5%;
    position: relative;
    &-left {
      flex: 60%;
      position: relative;
      .content{
        position: absolute;
        z-index: 111;
      }
      &-name {
        font-size: 28px;
        font-family: "kaiti", sans-serif;
        margin-bottom: 6px;
      }
      &-factory {
        display: inline;
      }
    }
    &-right {
      flex: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
