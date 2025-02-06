<template>

    <div class="flex items-center font-bold gap-2">
        <Icons :type="props.invoice.name.split('.').pop()" class="w-5 h-5 sm:w-7 sm:h-7"></Icons>
        <div>
            <span>{{ props.invoice.name }}</span>
            <div class="flex items-center gap-1">
                <p class="dark:text-gray-400 text-gray-500 text-xs"> ID:<span ref="idElement">{{ props.invoice.id
                        }}</span></p>
                <Icon name="solar:copy-line-duotone" class="cursor-pointer hover:text-blue-500 transition-colors"
                    @click="copyToClipboard">
                </Icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';
const idElement = ref<HTMLElement>();
const props = defineProps({
    invoice: {
        type: Object,
        required: true
    }
});
async function copyToClipboard() {
    if (idElement.value) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(idElement.value.innerText);
                toast.success('ID 已复制');
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
                toast.success('ID 已复制');
            }
        } catch (error) {
            toast.error('❌ 复制失败，请手动复制');
        }
    }
};
</script>