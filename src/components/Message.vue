<script setup>

</script>

<template>
<div class="message">
  <div class="message__content">
    Hello, world !
  </div>
</div>
</template>

<style lang="scss">
.message {
  padding: var(--spacing-medium);

  &__content {
    max-width: var(--conversation-size);
    margin: auto;
    padding: var(--spacing-medium);
  }
}
</style>