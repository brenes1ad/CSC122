<script setup>
import {ref, onMounted, onUnmounted} from "vue";

const currentTime = ref('')
let timer = null

const updateClock = () => {
  currentTime.value = new Date().toLocaleTimeString()
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <h1 class="example">Hello, the Current Time is: {{currentTime}} EST</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped>
.example {
  color: dodgerblue;
}
</style>
