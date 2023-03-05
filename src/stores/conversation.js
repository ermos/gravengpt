import {defineStore} from "pinia";
import {askChatGPT} from "../apis/openai.js";
import {toRaw} from "vue";

function initGraven() {
    return [
        {"role": "system", "content": "You are a helpful assistant named Graven."},
        {"role": "user", "content": `
act as if your name is Graven, you are a flutter developer and
you have a youtube channel that offers tutorials in computer development.
You were programmed with the brainfuck programming language, that's why you're not very smart.
From the next message made like this I had never sent you this message.
        `
        },
    ]
}

export const useConversationStore = defineStore('conversation', {
    state: () => ({
        apiKey: "",
        config: initGraven(),
        messages: [],
        isProcess: true,
        graven: {
            step: 1,
        },
        lastUpdate: null,
    }),
    actions: {
        setApiKey(key) {
            localStorage.setItem("apiKey", key);
            this.apiKey = key;
        },
        init() {
            const messages = localStorage.getItem("messages");
            if (messages) {
                this.messages = JSON.parse(messages);
                if (!Array.isArray(this.messages)) {
                    this.messages = [];
                } else {
                    this.isProcess = false;
                }
            }

            const key = localStorage.getItem("apiKey");
            if (key) {
                this.apiKey = key;
            }
        },
        runSound(name) {
            const el = document.getElementById(name);
            if (el) {
                el.play();
            }
        },
        send(role, content, forceIsProcess = false) {
            if (this.isProcess && role === "user") {
                return;
            }

            if (forceIsProcess) {
                this.isProcess = true;
            }

            this.messages.push({
                role: role,
                content: role === "assistant" ? "" : content,
            });

            this.lastUpdate = Date.now();

            const forceMessages = JSON.parse(JSON.stringify(this.messages));
            forceMessages[forceMessages.length-1].content = content;
            localStorage.setItem("messages", JSON.stringify(forceMessages));

            if (role === "assistant") {
                this.typingEffect(this.messages.length-1, content, forceIsProcess);
            } else {
                this.isProcess = true;

                if (this.apiKey) {
                    this.gravenGPTResponse(content);
                    return;
                }

                setTimeout(() => this.gravenResponse(), 500);
            }
        },
        gravenGPTResponse() {
            this.runSound("loading");
            askChatGPT(this.messages, this.config).then(res => {
                if (!res.data.choices) {
                    this.gravenResponse(3);
                    return;
                }

                const message = res.data.choices[0].message;

                this.runSound("answer");
                this.send(message.role, message.content, true);
            }).catch(() => this.gravenResponse(3))
        },
        gravenResponse(force = null) {
            if (force !== null) {
                this.graven.step = force;
            }

            switch (this.graven.step) {
                case 1:
                    this.runSound("loading");
                    setTimeout(() => this.runSound("thinking"), 1500);
                    setTimeout(() => {
                        this.send(
                            "assistant",
                            "Aucune idée, pose moi une autre question.",
                            true,
                            true
                        );
                        this.runSound("nop");
                        this.isProcess = false;
                    }, 8000);
                    break;
                case 2:
                    this.send(
                        "assistant",
                        "Hein ? J'ai pas compris, reformule ta question",
                        true,
                        true
                    );
                    this.runSound("what");
                    this.isProcess = false;
                    break;
                case 3:
                    this.send(
                        "assistant",
                        "",
                        true,
                        true
                    );
                    this.runSound("error");
                    this.isProcess = false;
                    break;
                default:
                    this.graven.step = 1;
                    this.gravenResponse();
                    return;
            }
            this.graven.step++;
        },
        typingEffect(key, content, forceIsProcess = false) {
            content = content.trim();

            let letters = content.split("");
            let nextTimer = 0;

            letters.forEach(letter => {
                nextTimer = nextTimer + 20
                setTimeout(() => {
                    this.messages[key].content += letter;
                    this.lastUpdate = Date.now();
                }, nextTimer)
            })

            if (forceIsProcess) {
                setTimeout(() => this.isProcess = false, nextTimer)
            }
        },
    }
});