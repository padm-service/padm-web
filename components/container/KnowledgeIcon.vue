<template>
    <div class="flex items-center font-bold gap-2">
        <Icons type="pdf" class="w-5 h-5 sm:w-7 sm:h-7"></Icons>
        <div class="">
            <span>test.pdf</span>
            <div class="flex items-center gap-1">
                <p class="text-gray-400 text-xs"> ID:<span ref="idElement">1814294337907986432</span>
                </p>
                <Icon name="solar:copy-line-duotone" class="cursor-pointer hover:text-blue-500 transition-colors">
                </Icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Clipboard from 'clipboard';
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast();
const idElement = ref<HTMLElement>();

// 初始化 Clipboard.js
let clipboard: Clipboard | null = null;

onMounted(() => {
    clipboard = new Clipboard('.cursor-pointer', {
        text: () => idElement.value?.innerText || ''
    });

    clipboard.on('success', () => {
        toast({
            title: '✅ID 已复制',
        });
    });

    clipboard.on('error', () => {
        toast({
            title: '❌ 复制失败，请手动复制',
        });
    });
});
const copyId = async () => {
    try {
        await navigator.clipboard.writeText(idElement.value?.innerText || '');
        toast({ title: '✅ID 已复制' });
    } catch {
        toast({ title: '❌ 复制失败，请手动复制' });
    }
}
onBeforeUnmount(() => {
    if (clipboard) {
        clipboard.destroy();
    }
});

</script>