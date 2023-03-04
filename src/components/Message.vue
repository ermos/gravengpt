<script setup>
const props = defineProps({
  content: {}
})
</script>

<template>
<div class="message">
  <div class="message__content">
    <img class="message__avatar" :src="`/images/${props.content.author}.jpg`" alt="it's graven !" width="269" height="269" />
    <p class="message__text" v-html="props.content.message" />
  </div>
</div>
</template>

<style lang="scss">
.message {
  padding: var(--spacing-medium);

  &__content {
    display: flex;
    align-items: flex-start;
    max-width: var(--conversation-size);
    margin: auto;
    padding: var(--spacing-medium);
  }

  &__avatar {
    width: 30px;
    height: 30px;
    margin: var(--spacing-little);
    margin-top: 15px;
  }

  &__text {
    margin: var(--spacing-little);
    font-size: 1.5rem;
    letter-spacing: -0.03px;
    text-rendering: optimizeLegibility;
    line-height: 1.58;

    b {
      font-weight: 700;
    }
  }
}
</style>