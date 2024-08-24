<template>
  <div class="flex text-12px text-#fff font-bold">
    <div></div>
    <div>
      {{ b }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'DemoVue'
})
const a = ref('11')
const b = '2'
</script>

<style scoped></style>
