import Axios from "axios";
import {useConversationStore} from "../stores/conversation.js";


export const askChatGPT = (messages = [], config = []) => {
    const conversation = useConversationStore();

    const list = [];
    list.push(...config);
    list.push(...messages);

    return Axios.post("https://api.openai.com/v1/chat/completions", {
        "model": "gpt-3.5-turbo",
        "messages": list,
        "temperature": 0,
        "max_tokens": 100,
    }, {
        headers: { Authorization: `Bearer ${conversation.apiKey}` }
    })
}