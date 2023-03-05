<script setup>
import {onBeforeMount, reactive, ref, watch} from "vue";
import {useConversationStore} from "../stores/conversation.js";

const conversation = useConversationStore();

const input = ref(null);

const emits = defineEmits(["exit"]);

const props = defineProps({
  isOpened: {
    type: Boolean,
    default: false,
  },
})

const data = reactive({
  apiKey: "",
})

onBeforeMount(() => {
  if (conversation.apiKey) {
    data.apiKey = conversation.apiKey;
  }
})

watch(() => props.isOpened, (v) => {
  v ? open() : exit()
});

function open() {
  document.body.addEventListener("click", handleExit, true);
}

function exit() {
  document.body.removeEventListener("click", handleExit, true);
}

function handleExit(event) {
  if (event && input.value.contains(event.target)) {
    return;
  }
  emits("exit", true);
}

function handlePushApiKey() {
  conversation.setApiKey(data.apiKey);
  data.apiKey = "";
  emits("exit", true);
}

</script>

<template>
<div class="open-ai" v-show="props.isOpened">
  <input
      ref="input"
      type="text"
      class="open-ai__content"
      placeholder="Insère ta clef API open AI"
      v-model="data.apiKey"
      @keydown.enter="handlePushApiKey"
  >
</div>
</template>

<style lang="scss">
.open-ai {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--main-color), 0.5);

  &__content {
    flex: 1;
    outline: none;
    padding: 15px calc(var(--spacing-medium) + var(--spacing-large)) 15px 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius-little);
    background-color: rgb(var(--main-color-light));
    border: 1px solid rgba(0, 0, 0, 0.3);
    color: rgb(var(--sub-color));
    font-size: 1.5rem;
    max-width: var(--conversation-size);
  }
}
</style>