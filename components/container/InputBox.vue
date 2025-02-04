<template>
    <div class="py-4 px-4  dark:bg-[#2F2F2F] bg-[#e8e8e8] rounded-3xl flex-col flex">
        <textarea v-model="inputText"
            class="outline-none   w-full border-none dark:bg-[#313131] bg-[#e8e8e8] rounded-lg resize-none placeholder-gray-500 overflow-y-auto sb sb-sm sm:sb-md"
            placeholder="给小橘发送消息...." ref="textArea" @input="adjustHeight">
        </textarea>
        <div class="flex justify-between">
            <Toggle variant="outline" aria-label="Toggle bold"
                class="rounded-xl border-none data-[state=on]:bg-[#DBEAFE] data-[state=on]:text-[#4D6BFE]   dark:data-[state=on]:text-[#48aaff] dark:data-[state=on]:bg-[#2a4a6d] gap-2">
                <Icon name="ic:twotone-menu-book" class="w-5 h-5 sm:w-7 sm:h-7"></Icon>
                <span class="hidden sm:flex">知识库</span>
            </Toggle>
            <div class="flex items-center gap-1">
                <div>
                    <Label for="upload" class="flex items-center p-1 rounded-md cursor-pointer hover:bg-accent">
                        <Icon name="flowbite:paper-clip-outline" class="w-7 h-7"></Icon>
                    </Label>
                    <Input id="upload" type="file" class="hidden" />
                </div>
                <Button variant="ghost" size="icon">
                    <Icon name="mingcute:send-plane-fill" class="w-7 h-7"></Icon>
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const inputText = ref('');
const textArea = ref(null);
const maxHeight = 200;

const adjustHeight = () => {
    textArea.value.style.height = 'auto';
    textArea.value.style.height = Math.min(
        textArea.value.scrollHeight,
        maxHeight
    ) + 'px';
};

onMounted(() => {
    adjustHeight();
});
</script>