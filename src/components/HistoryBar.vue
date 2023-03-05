<script setup>

import {useConversationStore} from "../stores/conversation.js";
import Plus from "vue-material-design-icons/Plus.vue";
import MessageOutline from "vue-material-design-icons/MessageOutline.vue";
import Trash from "vue-material-design-icons/TrashCan.vue";
import LightBulb from "vue-material-design-icons/Lightbulb.vue";

const conversation = useConversationStore();

function handleClick() {
  if (conversation.isProcess) {
    return;
  }

  conversation.send(
      "graven",
      "Je ne suis pas assez entrainé pour pouvoir tenir plus d'une conversation à la fois, " +
      "déjà qu'une seule c'est compliqué...",
      true,
  );
}
</script>

<template>
<div class="history-bar">
  <button class="history-bar__btn" @click="handleClick"><plus class="icon" size="18" /> Nouvelle conversation</button>
  <div class="history-bar__conversations">
    <div class="history-bar__item active">
      <message-outline class="icon" size="18" />
      Heeeey !
    </div>
  </div>
  <div class="history-bar__footer">
    <div class="history-bar__item">
      <trash class="icon" size="18" />
      Effacer les conversations
    </div>
    <div class="history-bar__item">
      <light-bulb class="icon" size="18" />
      Mode lumineux
    </div>
  </div>
</div>
</template>

<style lang="scss">
.history-bar {
  max-width: 250px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;

  &__item, &__btn {
    color: rgb(var(--sub-color));
    padding: 15px;
    border-radius: var(--radius-little);
    width: calc(100% - var(--spacing-medium));
    margin: var(--spacing-little);
    cursor: pointer;
    transition: all ease-in-out 200ms;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;

    & > .icon {
      margin-right: var(--spacing-little);
    }
  }

  &__btn {
    background-color: rgba(var(--sub-color), 0);
    border: 1px solid rgba(var(--sub-color), 0.5);

    &:hover {
      background-color: rgba(var(--sub-color), 0.2);
    }
  }

  &__item {
    &.active, &:hover {
      background-color: rgba(var(--main-color-light), 0.5);
    }
  }

  &__conversations {
    flex: 1;
  }

  &__footer {
    border-top: 1px solid rgba(var(--main-color-light), 0.5);
  }
}
</style>