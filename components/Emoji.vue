<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="ghost" class="w-16">
                <Icon name="line-md:cookie-settings-twotone" class="w-7 h-7"></Icon>
            </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" class="contents">
            <ClientOnly>
                <EmojiPicker :display-recent="true" :key="colorMode.value" :native="true" @select="onSelectEmoji"
                    :theme="colorMode.value === 'dark' ? 'dark' : 'light'" class="" />
            </ClientOnly>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
const colorMode = useColorMode()

const onSelectEmoji = (emoji: any) => {
    emit('select-emoji', emoji.i);
};

// 定义事件
const emit = defineEmits(['select-emoji']);

</script>