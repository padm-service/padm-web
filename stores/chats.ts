import type { Chat } from "~/lib/type";

export const chatStore = defineStore('chat', () => {
    const chat = ref<Chat | null>();
    const chatList = ref<Chat[]>([]);
    return { chat, chatList };
})