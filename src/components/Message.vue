<script setup>

</script>

<template>
<div class="message">
  <div class="message__content">
    <img class="message__avatar" src="/images/graven.jpg" alt="it's graven !" width="269" height="269" />
    <p class="message__text">Bonjour moi c'est Graven !</p>
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
  }

  &__text {
    margin: var(--spacing-little);
    font-size: 1.5rem;
  }
}
</style>