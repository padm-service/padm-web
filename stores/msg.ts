import type { Message } from "~/lib/type";
import { fetchEventSource } from '@microsoft/fetch-event-source';
const baseUrl = useRuntimeConfig().public.apiBase;
const route = useRoute();
export const messageStore = defineStore('msg', () => {
    const messageList = ref<Message[]>([]);
    const pending = ref(false);
    const abortCtrl = ref()
    const sendMessage = async (option: any) => {
        pending.value = true;
        messageList.value.push(...option?.messages);
        messageList.value.push({
            role: "assistant",
            content: [{ type: "text", text: "" }],
        } as Message);
        abortCtrl.value = new AbortController();
        option.messages = messageList.value.slice(0, -1);
        fetchEventSource(`/api/assistants/${route.params.assId}/chats/${option.chatId}/query`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${useCookie('hz_token').value}`
            },
            body: JSON.stringify(option),
            signal: abortCtrl.value.signal,
            onmessage: (event) => {
                const data = JSON.parse(event.data);
                messageList.value[messageList.value.length - 1].content[0].text += data;
            },
            onerror: (error) => {
                console.error('Error:', error);
            },
            onclose() {
                pending.value = false;
            }
        });
    }

    return { messageList, sendMessage, pending, abortCtrl };
})