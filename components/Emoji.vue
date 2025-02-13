<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="ghost" class="w-16">
                <Icon name="hugeicons:installing-updates-01" class="w-7 h-7"></Icon>
            </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" class="contents">
            <ClientOnly>
                <EmojiPicker :display-recent="true" :key="colorMode.value" :native="true" @select="onSelectEmoji"
                    :theme="colorMode.value === 'dark' ? 'dark' : 'light'" />
            </ClientOnly>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import 'vue3-emoji-picker/css'
const EmojiPicker = defineAsyncComponent(() =>
    import("vue3-emoji-picker").then((EmojiPicker) => EmojiPicker)
);
const colorMode = useColorMode()

const onSelectEmoji = (emoji: any) => {
    emit('select-emoji', emoji.i);
};

// 定义事件
const emit = defineEmits(['select-emoji']);

</script>
