<template>
    <div v-html="marked.parse(props.content)" class="markdown overflow-x-auto">

    </div>
</template>
<script setup lang="ts">
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
const colorMode = useColorMode()

useHead(() => ({
    link: [
        {
            rel: 'stylesheet',
            href: colorMode.value === 'dark'
                ? '/css/github-dark.css'
                : '/css/github.css'
        }
    ]
}));

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
});
const marked = new Marked({
    gfm: true, // 启用 GitHub Flavored Markdown
},
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
);

</script>