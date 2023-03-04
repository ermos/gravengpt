<script setup>
import HistoryBar from "./components/HistoryBar.vue";
import Conversation from "./components/Conversation.vue";
</script>

<template>
  <history-bar />
  <conversation />
</template>

<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
  display: flex;
}
</style>
