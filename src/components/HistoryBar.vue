<script setup>

import {useConversationStore} from "../stores/conversation.js";

const conversation = useConversationStore();

function handleClick() {
  conversation.send(
      "graven",
      "Je ne suis pas assez entrainé pour pouvoir tenir plus d'une discussion à la fois, " +
      "déjà qu'une seule c'est compliqué...",
      true,
  );
}
</script>

<template>
<div class="history-bar">
  <button class="history-bar__btn" @click="handleClick">Nouvelle conversation</button>

</div>
</template>

<style lang="scss">
.history-bar {
  max-width: 250px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  &__btn {
    background-color: rgba(var(--sub-color), 0);
    border: 1px solid rgba(var(--sub-color), 0.5);
    color: rgb(var(--sub-color));
    padding: 15px;
    border-radius: var(--radius-little);
    width: calc(100% - var(--spacing-medium));
    margin: var(--spacing-little);
    cursor: pointer;
    transition: all ease-in-out 200ms;

    &:hover {
      background-color: rgba(var(--sub-color), 0.2);
    }
  }
}
</style>