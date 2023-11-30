<script setup lang="ts">
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
});
</script>

<template>
  <!-- <div class="toolbtn">
    <slot></slot>
    <p>{{ props.title }}</p>
  </div> -->
  <div class="toolbtn" :style="{background:background}">
    <v-btn variant="text" width="5rem" height="5rem">
      <div class="toolbtn-v">
        <slot></slot>
      </div>
    </v-btn>
    <p class="toolbtn-p">{{ props.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.toolbtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-v {
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-p {
    font-size: 1.25rem;
  }
}
</style>
