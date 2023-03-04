import {defineStore} from "pinia";

export const useConversationStore = defineStore('conversation', {
    state: () => ({
        messages: [],
        isProcess: true,
    }),
    getters: {
    },
    actions: {
        send(author, message, withTypeEffect = false) {
            this.messages.push({
                author: author,
                message: withTypeEffect ? "" : message,
            });

            if (withTypeEffect) {
                this.typingEffect(this.messages.length-1, message);
            }
        },
        typingEffect(key, message) {
            message = message.trim();

            let letters = message.split("");
            let nextTimer = 0;

            letters.forEach(letter => {
                nextTimer = nextTimer + 40
                setTimeout(() => this.messages[key].message += letter, nextTimer)
            })
        }
    }
});