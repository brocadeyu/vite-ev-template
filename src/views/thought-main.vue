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
let a = []
let _selt = this
a.push({})
</script>

<style scoped></style>
