<template>
    <div class="flex flex-col gap-2">
        <div v-for="message in props.message" :key="message.type">
            <div class="" v-if="message.type === 'text'" v-html="marked.parse(message.text)">

            </div>
            <div class="" v-else>
                {{ message.file_url }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { marked } from 'marked';
import { type MessageContent } from '@/lib/type'
const props = defineProps({
    message: Array<MessageContent>,
    default: () => []
});

// marked.setOptions({
//     highlight: function (code, language) {
//         return hljs.highlightAuto(code).value;
//     },
//     breaks: true
// });

</script>