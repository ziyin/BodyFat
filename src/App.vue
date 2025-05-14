<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView />
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  max-width: 100vw;
}
#app {
  margin: 0 !important;
  padding: 0 !important;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
}
</style>