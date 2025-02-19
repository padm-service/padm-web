<template>
    <Toaster class="pointer-events-auto" :duration="2000" position="top-center" :expand="false" richColors
        :theme="colorMode.value === 'dark' ? 'dark' : 'light'" :visibleToasts="1" />
    <div>
        <NuxtLoadingIndicator color="blue" errorColor="red" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
const colorMode = useColorMode()
</script>