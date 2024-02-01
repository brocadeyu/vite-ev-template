<template>
  <div class="overview-container">
    <thought-table></thought-table>
  </div>
</template>

<script setup lang="ts">
import thoughtTable from './components/thought-table.vue'
</script>

<style scoped>
.overview-container {
  height: 92vh;
  padding: 25px;
  box-sizing: border-box;
  background-color: black;
}
</style>
