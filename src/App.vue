<script setup>
import HistoryBar from "./components/HistoryBar.vue";
import Conversation from "./components/Conversation.vue";
import {onMounted} from "vue";
import {useConversationStore} from "./stores/conversation.js";

const conversation = useConversationStore();

onMounted(() => {
  conversation.init();
  if (conversation.messages.length === 0) {
    conversation.send(
        "assistant",
        "Heeeey !<br>" +
        "Et bien salut à tous c'est GravenGPT,<br><br>" +
        "je suis une I.A qui à été entrainer plus de <b>0</b> fois !<br>" +
        "Je suis donc capable de répondre à aucune de tes questions 😃<br><br>" +
        "Si tu souhaites me rendre intelligent, insère ta clé openAI en cliquant sur le bouton en bas à gauche.<br><br>" +
        "Alors, que veux-tu savoir ?",
        true
    );
  }
});

const soundList = [
    "answer",
    "error",
    "flashbang",
    "loading",
    "nop",
    "thinking",
    "what"
];
</script>

<template>
  <history-bar />
  <conversation />
  <div class="preload-sound">
    <audio v-for="(sound, i) in soundList" :key="i" :id="sound" :src="`/sounds/${sound}.mp3`"></audio>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.preload-sound {
  display: none;
}
</style>