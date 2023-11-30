<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: () => {
      return "";
    },
  },
});
</script>

<template>
  <div class="btn">
    <div class="btn-icon">
      <slot name="icon"></slot>
    </div>
    <div class="btn-title">
      <span>{{ props.title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
//   height: 5rem;
  &-icon {
  }
  &-title {
  }
}
</style>
