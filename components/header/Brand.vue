<template>
    <div class="flex items-center gap-2">
        <Button variant="outline" size="icon" class="sm:hidden">
            <Icon name="mdi:table-of-contents" class="w-7 h-7" />
        </Button>
        <a class="text-nowrap" href="/">
            <h1 class="text-3xl font-extrabold flex gap-2 items-center">
                <img class="h-8 w-10" :src="Logo" alt="" />
                <span class="hidden sm:block">农业 AI 服务</span>
            </h1>
        </a>
    </div>
</template>

<script setup>
import Logo from '@/assets/style/logo.png'
</script>

<style scoped>
/* button[data-state='on'] {
  @apply border-2 border-primary;
} */
</style>
