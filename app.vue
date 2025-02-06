<template>
    <Toaster :duration="2000" position="top-center" :expand="false" richColors
        :theme="colorMode.preference === 'dark' ? 'dark' : 'light'" :visibleToasts="1" />
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
const colorMode = useColorMode()
</script>