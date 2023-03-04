<script setup>
import Message from "./Message.vue";
import {nextTick, ref, watch} from "vue";
import WriteForm from "./WriteForm.vue";

const scroll = ref();

watch(() => {}, () => {
  nextTick(() => {
    if (scroll.value.scrollTop + scroll.value.clientHeight !== scroll.value.scrollHeight) {
      scroll.value.scrollTop = scroll.value.scrollHeight;
    }
  })
})
</script>

<template>
<div class="conversation">
  <div class="conversation__messages">
    <div ref="scroll" class="conversation__messages--wrapper">
      <TransitionGroup name="conversation-slide">
        <message v-for="i in 10" />
      </TransitionGroup>
    </div>
    <div class="conversation__messages--shadow"></div>
  </div>
  <write-form />
</div>
</template>

<style lang="scss">
.conversation {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__messages {
    position: relative;
    flex: 1 1 auto;
    height: 0;

    &--wrapper {
      height: 100%;
      overflow-y: auto;
      padding-bottom: 50px;

      & > .message:nth-child(even) {
        background-color: rgba(var(--sub-color), 0.05);
      }
    }

    &--shadow {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(180deg,rgba(var(--main-color), 0),rgb(var(--main-color)) 58.85%);
      height: 50px;
    }
  }

  &-slide-enter-active,
  &-slide-leave-active {
    transition: all 0.5s ease;
  }

  &-slide-enter-from,
  &-slide-leave-to {
    opacity: 0;
    transform: translateX(-50px);
  }
}
</style>