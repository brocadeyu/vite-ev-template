<template>
  <div
    v-dialogDrag="isDraggable"
    :style="{
      width: computedStyle.width,
      height: computedStyle.height,
      backgroundImage: 'url(' + bg + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      boxShadow: 'inset 0px 0px 200px 130px #0b1a39'
    }"
    class="bd-warpper"
  >
    <div class="bd-header">
      <div>{{ props.title }}</div>
      <slot name="header"></slot>
    </div>
    <div class="bd-content" :style="{}">
      <slot name="content"></slot>
    </div>
    <div v-if="showFooter" class="bd-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
// import SHIP052D from '@/assets/model/052d.png'
const props = withDefaults(
  defineProps<{
    title?: string
    width: string
    height: string
    showFooter?: boolean
    isDraggable?: boolean
    bg?: string
  }>(),
  { title: '', showFooter: false, isDraggable: false, bg: '' }
)

const computedStyle = computed(() => ({
  width: props.width,
  height: props.height
}))
</script>

<style scoped>
.bd-warpper {
  position: fixed;
  background-color: #0b1a39;
  border: 2px solid #119aa0;
  box-sizing: border-box;
  padding: 3px;
  display: flex;
  flex-direction: column;
}
.bd-header {
  font-size: 15px;
  height: 25px;
  display: flex;
  align-items: center;
  padding-left: 6px;
  color: white;
  background-image: linear-gradient(to right, #104064, #182740);
  display: flex;
  justify-content: space-between;
}
.bd-content {
  flex: 1;
  /* background-color: rebeccapurple; */
}
.bd-footer {
  height: 25px;
}
</style>
