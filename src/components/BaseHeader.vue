<template>
  <div>
    <div>{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped></style>
