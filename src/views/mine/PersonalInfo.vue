<script setup lang="ts">
import { no } from "@/utils/msg";
import { ref, reactive } from "vue";
import { userStore } from "@/store/user";
import IconEdit from "~icons/app/edit.svg";
import IconSend from "~icons/app/send.svg";
import IdCard from "@/components/IdCard.vue";
import { getFactorys, updateUserInfo } from "@/apis/apis";

const UStore = userStore();

const readonly = ref<boolean>(true);
const factorys = ref<Array<string>>([]);

const formLabelAlign = reactive({
  factory: UStore.$state.userInfo.factory,
  department: UStore.$state.userInfo.dept_name,
  userName: UStore.$state.userInfo.name,
  phoneNum: UStore.$state.userInfo.phone,
});
/**
 * 编辑表格
 */
const eidtForm = () => {
  if (readonly.value) {
    readonly.value = !readonly.value;
  } else {
    if (!/^1[3456789]\d{9}$/.test(formLabelAlign.phoneNum)) {
      formLabelAlign.phoneNum = UStore.$state.userInfo.phone;
      no("请填写正确的电话号码");
      readonly.value = !readonly.value;
      return;
    } else {
      const params = {
        factory: formLabelAlign.factory,
        phone: formLabelAlign.phoneNum,
      };
      updateUserInfo(params).then((res) => {
        console.log(res);
      });
      readonly.value = !readonly.value;
    }
  }
};
/**
 * 获取工厂数据
 */
const getFactory = () => {
  getFactorys()
    .then((res) => {
      res.data.data.forEach((item: any) => {
        factorys.value.push(item.factory);
      });
    })
    .catch((err) => {
      no(`分厂数据请求出错:${err}`);
    });
};
getFactory();
</script>

<template>
  <div class="personalinfo">
    <IdCard></IdCard>
    <div class="personalinfo-form">
      <el-form
        label-position="top"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="厂区：">
          <el-select
            v-model="formLabelAlign.factory"
            class="m-2"
            style="width: 100%"
            :disabled="readonly"
          >
            <el-option
              v-for="item in factorys"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input v-model="formLabelAlign.department" :readonly="true" />
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="formLabelAlign.userName" :readonly="true" />
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="formLabelAlign.phoneNum" :readonly="readonly" />
        </el-form-item>
      </el-form>
      <v-btn
        class="personalinfo-form-submit"
        :color="readonly ? '#5F9AA2' : 'blue'"
        :prepend-icon="readonly ? IconEdit : IconSend"
        @click="eidtForm"
        variant="tonal"
        >{{ readonly ? "修改" : "提交" }}</v-btn
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.personalinfo {
  padding: 1rem 0.75rem;
  &-form {
    margin-top: 1rem;
    position: relative;
    &-submit {
      position: absolute;
      right: 0;
    }
  }
}
</style>
