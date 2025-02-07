<template>
    <div class="border w-fit p-2 rounded-md flex gap-2 items-center">
        <Badge class="rounded-md p-1 uppercase bg-green-950" variant="outline" :class="{}">get</Badge>
        <span ref="idElement" class="dark:text-gray-400 text-gray-500">
            https://api.platform.archivemodel.cn/assistants/{id}/chats/{chat_id}</span>
        <Icon name="solar:copy-line-duotone" class="cursor-pointer hover:text-blue-500 transition-colors bg-green-600"
            @click="copyToClipboard">
        </Icon>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';
const idElement = ref<HTMLElement>();

async function copyToClipboard() {
    if (idElement.value) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(idElement.value.innerText);
                toast.success('url已复制');
            } else {
                // 降级方案：使用 document.execCommand
                const textarea = document.createElement('textarea');
                textarea.value = idElement.value.innerText;
                textarea.style.position = 'fixed';
                textarea.style.top = '0';
                textarea.style.left = '0';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                toast.success('url已复制');
            }
        } catch (error) {
            toast.error('❌ 复制失败，请手动复制');
        }
    }
};
</script>