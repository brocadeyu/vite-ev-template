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
  height: 100vh;
  padding: 11vh 25px 25px 25px;
  box-sizing: border-box;
  /* background-color: black; */
  background-color: transparent;
}
</style>
