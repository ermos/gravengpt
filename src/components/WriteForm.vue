<script setup>
import {reactive} from "vue";
import {useConversationStore} from "../stores/conversation.js";

const conversation = useConversationStore();

const data = reactive({
  message: "",
});

function handleSend() {
  conversation.send("graven", data.message, false);
  data.message = "";
}
</script>

<template>
  <div class="write-form">
    <div class="write-form__input">
      <input
          type="text"
          placeholder="ask anything to Graven, he will give you answer, if he can.."
          v-model="data.message"
          @keydown.enter="handleSend"
      />
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
    display: flex;
    max-width: var(--conversation-size);
    width: 100%;
    margin: auto;
    padding: var(--spacing-medium);

    input {
      flex: 1;
      outline: none;
      padding: 15px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: var(--radius-little);
      background-color: rgb(var(--main-color-light));
      border: 1px solid rgba(0, 0, 0, 0.4);
      color: rgb(var(--sub-color));
      font-size: 1.5rem;
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
</style>