import {defineStore} from "pinia";

export const useConversationStore = defineStore('conversation', {
    state: () => ({
        messages: [],
        isProcess: true,
        graven: {
            step: 1
        },
    }),
    getters: {
    },
    actions: {
        send(author, message, withTypeEffect = false, stopProcess = true) {
            this.isProcess = true;

            this.messages.push({
                author: author,
                message: withTypeEffect ? "" : message,
            });

            if (withTypeEffect) {
                this.typingEffect(this.messages.length-1, message);
                return;
            }

            if (stopProcess) {
                this.isProcess = false;
            }

            if (author === "user") {
                this.isProcess = true;
                setTimeout(() => this.gravenResponse(), 500);
            }
        },
        gravenResponse() {
            switch (this.graven.step) {
                case 1:
                    new Audio('/sounds/loading.mp3').play();
                    setTimeout(() => {
                        this.send(
                            "graven",
                            "Tu me pose une colle, attend deux secondes.. Euh....",
                            true,
                            false
                        );
                        new Audio('/sounds/thinking.mp3').play();
                    }, 1500);
                    setTimeout(() => {
                        this.send(
                            "graven",
                            "Nan je vois pas, pose moi une autre question",
                            true,
                            true
                        );
                        new Audio('/sounds/nop.mp3').play();
                    }, 8000);
                    break;
                case 2:
                    this.send(
                        "graven",
                        "Hein ? J'ai pas compris, reformule ta question",
                        true,
                        true
                    );
                    new Audio('/sounds/what.mp3').play();
                    break;
                case 3:
                    this.send(
                        "graven",
                        "",
                        true,
                        true
                    );
                    new Audio('/sounds/error.mp3').play();
                    break;
                default:
                    this.graven.step = 1;
                    this.gravenResponse();
                    return;
            }
            this.graven.step++;
        },
        typingEffect(key, message) {
            message = message.trim();

            let letters = message.split("");
            let nextTimer = 0;

            letters.forEach(letter => {
                nextTimer = nextTimer + 20
                setTimeout(() => this.messages[key].message += letter, nextTimer)
            })

            setTimeout(() => this.isProcess = false, nextTimer)
        }
    }
});