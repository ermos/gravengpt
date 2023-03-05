<script setup>
import {onMounted, reactive} from "vue";
import {useConversationStore} from "../stores/conversation.js";
import Send from "vue-material-design-icons/Send.vue";
import Arrow from "vue-material-design-icons/ArrowUp.vue";

const conversation = useConversationStore();

const data = reactive({
  message: "",
  isFirstAsk: false,
});

onMounted(() => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  if (params.ask) {
    data.message = params.ask;
    data.isFirstAsk = true;
  }
});

function handleSend() {
  if (conversation.isProcess) {
    return;
  }

  conversation.send("user", data.message, false);
  data.message = "";
  data.isFirstAsk = false;
}
</script>

<template>
  <div class="write-form">
    <div class="write-form__input" :class="{ disabled: conversation.isProcess }">
      <input
          type="text"
          placeholder="Pose moi une question !"
          v-model="data.message"
          @keydown.enter="handleSend"
          :disabled="conversation.isProcess"
      />
      <send @click="handleSend" class="write-form__input--icon" size="16" />
      <arrow v-if="data.isFirstAsk" class="write-form__input--from-ask" size="60"/>
    </div>
    <p class="write-form__info">
      <a href="https://github.com/ermos/gravengpt">GravenGPT Feb 13 Version</a>.
      Our goal is to make the most useless language model ever trained.
    </p>
  </div>
</template>

<style lang="scss">
.write-form {
  position: relative;
  padding: var(--spacing-medium);
  display: flex;
  flex-direction: column;

  &__input {
    position: relative;
    display: flex;
    max-width: var(--conversation-size);
    width: 100%;
    margin: auto;
    padding: var(--spacing-medium);

    input {
      flex: 1;
      outline: none;
      padding: 15px calc(var(--spacing-medium) + var(--spacing-large)) 15px 15px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: var(--radius-little);
      background-color: rgb(var(--main-color-light));
      border: 1px solid rgba(0, 0, 0, 0.3);
      color: rgb(var(--sub-color));
      font-size: 1.5rem;
    }

    &--icon {
      position: absolute;
      right: calc(var(--spacing-large) + var(--spacing-little));
      top: 50%;
      margin-top: -8px;
      cursor: pointer;
      opacity: 0.5;
    }

    &--from-ask {
      position: absolute;
      right: var(--spacing-little);
      bottom: calc(100% - var(--spacing-large));
      transform: rotate(190deg);
      animation: ease-in-out 1000ms arrow-moving infinite;
    }

    &.disabled &--icon {
      color: #f67b7b;
      cursor: not-allowed;
    }
  }

  &__info {
    max-width: var(--conversation-size);
    width: 100%;
    margin: auto;
    padding: 0 var(--spacing-medium);
    font-size: 1.2rem;
    text-align: center;
    color: rgba(var(--sub-color), 0.5);
  }
}

@keyframes arrow-moving {
  0% {
    transform: rotate(190deg) translateY(0);
  }
  50% {
    transform: rotate(190deg) translateY(-10px);
  }
  100% {
    transform: rotate(190deg) translateY(0);
  }
}
</style>