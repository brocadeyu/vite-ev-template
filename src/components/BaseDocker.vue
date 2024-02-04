<template>
  <div
    :style="{
      width: computedStyle.width,
      height: computedStyle.height
    }"
    class="bd-warpper"
  >
    <div class="bd-header">
      {{ props.title }}
      <slot name="header"></slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  width: string
  height: string
}>()

const computedStyle = computed(() => ({
  width: props.width,
  height: props.height
}))
</script>

<style scoped>
.bd-warpper {
  background-color: #0b1a39;
  border: 2px solid #119aa0;
  box-sizing: border-box;
  padding: 3px;
}
.bd-header {
  font-size: 15px;
  height: 25px;
  display: flex;
  align-items: center;
  padding-left: 6px;
  color: white;
  background-image: linear-gradient(to right, #104064, #182740);
}
</style>
