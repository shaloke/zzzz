<script setup lang="ts">
import ListItem from "@/components/ListItem.vue";
import IconSearch from "~icons/app/search.svg";
import { ref } from "vue";

const searchKey = ref<string>("");
const search = () =>{
    alert(123)
}
</script>

<template>
  <div class="list">
    <div class="list-top">
      <v-text-field
        v-model="searchKey"
        label="搜索"
        clearable
        variant="outlined"
        :append-icon="IconSearch"
        @click:append="search"
      ></v-text-field>
    </div>
    <ListItem></ListItem>
  </div>
</template>

<style scoped lang="scss">
.list {
  // height: 100vh;
  padding: 0 1rem;
  &-top {
    margin-top: 1rem;
  }
}
</style>
