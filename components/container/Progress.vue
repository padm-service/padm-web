<template>
    <Progress v-model="progress" class="h-1 mx-auto" />
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const progress = ref(13)

watchEffect((cleanupFn) => {
    const timer = setTimeout(() => progress.value = 66, 500)
    cleanupFn(() => clearTimeout(timer))
})
</script>
