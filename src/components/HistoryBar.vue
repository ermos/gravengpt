<script setup>

import {useConversationStore} from "../stores/conversation.js";
import Plus from "vue-material-design-icons/Plus.vue";
import MessageOutline from "vue-material-design-icons/MessageOutline.vue";
import Trash from "vue-material-design-icons/TrashCan.vue";
import LightBulb from "vue-material-design-icons/Lightbulb.vue";
import Robot from "vue-material-design-icons/Robot.vue";
import {reactive} from "vue";
import OpenAI from "./OpenAI.vue";

const conversation = useConversationStore();

const data = reactive({
  isFlashbang: false,
  isLightMode: false,
  defaultCss: {},
  showOpenAI: false,
})

function handleCreateConversation() {
  if (conversation.isProcess) {
    return;
  }

  conversation.send(
      "assistant",
      "Je ne suis pas assez entrainé pour pouvoir tenir plus d'une conversation à la fois, " +
      "une seule c'est déjà assez compliqué...",
      true,
  );
}

function handleDeleteDiscussions() {
  if (conversation.isProcess) {
    return;
  }

  conversation.send(
      "assistant",
      "Mec.. déjà que je connais pas grand chose, laisse moi un peu de connaissance",
      true,
  );
}

function handleLightMode() {
  const root = document.documentElement.style;

  if (data.isLightMode) {
    root.setProperty("--main-color-dark", data.defaultCss["--main-color-dark"]);
    root.setProperty("--main-color", data.defaultCss["--main-color"]);
    root.setProperty("--main-color-light", data.defaultCss["--main-color-light"]);
    root.setProperty("--sub-color", data.defaultCss["--sub-color"]);
    data.isLightMode = false;
    return;
  }

  conversation.runSound("flashbang");

  setTimeout(() => {
    data.isFlashbang = true;

    setTimeout(() => {
      data.defaultCss = {
        "--main-color-dark": root.getPropertyValue("--main-color-dark"),
        "--main-color": root.getPropertyValue("--main-color"),
        "--main-color-light": root.getPropertyValue("--main-color-light"),
        "--sub-color": root.getPropertyValue("--sub-color"),
      };

      root.setProperty("--main-color-dark", "217, 217, 217");
      root.setProperty("--main-color", "255, 255, 255");
      root.setProperty("--main-color-light", "255, 255, 255");
      root.setProperty("--sub-color", "0, 0, 0");

      data.isLightMode = true;
    }, 1000);

    setTimeout(() => data.isFlashbang = false, 2000);
  }, 1500);
}
</script>

<template>
<div class="history-bar">
  <button class="history-bar__btn" @click="handleCreateConversation"><plus class="icon" :size="18" /> Nouvelle conversation</button>
  <div class="history-bar__conversations">
    <div class="history-bar__item active">
      <message-outline class="icon" :size="18" />
      Heeeey !
    </div>
  </div>
  <div class="history-bar__footer">
    <div class="history-bar__item" @click="handleDeleteDiscussions">
      <trash class="icon" :size="18" />
      Effacer les conversations
    </div>
    <div class="history-bar__item" @click="data.showOpenAI = true">
      <robot class="icon" :size="18" />
      Charger OpenAI
    </div>
    <div class="history-bar__item" @click="handleLightMode">
      <light-bulb class="icon" :size="18" />
      Mode lumineux
    </div>
  </div>
  <div class="flashbang" v-if="data.isFlashbang"></div>
  <open-a-i :is-opened="data.showOpenAI" @exit="data.showOpenAI = false"/>
</div>
</template>

<style lang="scss">
.history-bar {
  max-width: 250px;
  width: 100%;
  background-color: rgba(var(--main-color-dark), 0.3);
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
    user-select: none;

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

.flashbang {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  opacity: 0;
  pointer-events: none;
  animation: ease-in-out flashbang 2000ms forwards;
}

@keyframes flashbang {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>