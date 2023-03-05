import Axios from "axios";
import {useConversationStore} from "../stores/conversation.js";


export const askChatGPT = (prompt) => {
    const conversation = useConversationStore();

    return Axios.post("https://api.openai.com/v1/completions", {
        "model": "text-davinci-003",
        "prompt": prompt,
        "temperature": 0,
        "max_tokens": 100,
    }, {
        headers: { Authorization: `Bearer ${conversation.apiKey}` }
    })
}