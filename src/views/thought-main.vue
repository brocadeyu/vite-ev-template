<template>
  <BaseHeader :title="computeTitle"></BaseHeader>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const computeTitle = computed(() => {
  return useRoute().name as string
})
</script>

<style scoped></style>
