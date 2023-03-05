<script setup>
import HistoryBar from "./components/HistoryBar.vue";
import Conversation from "./components/Conversation.vue";
import {onMounted} from "vue";
import {useConversationStore} from "./stores/conversation.js";

const conversation = useConversationStore();

onMounted(() => {
  conversation.fetchApiKey();
  conversation.send(
      "graven",
      "Heeeey !<br>" +
      "Et bien salut à tous c'est GravenGPT,<br><br>" +
      "je suis une I.A qui à été entrainer plus de <b>0</b> fois !<br>" +
      "Je suis donc capable de répondre à aucune de tes questions 😃<br><br>" +
      "Si tu souhaites me rendre intelligent, insère ta clé openAI en cliquant sur le bouton en bas à gauche.<br><br>" +
      "Alors, que veux-tu savoir ?",
      true,
  );
})
</script>

<template>
  <history-bar />
  <conversation />
</template>

<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
  display: flex;
}
</style>