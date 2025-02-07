<template>
    <div class="flex items-center gap-2">
        <Sheet>
            <SheetTrigger>
                <Button variant="outline" size="icon" class="sm:hidden">
                    <Icon name="mdi:table-of-contents" class="w-7 h-7" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" class="p-0 w-2/3">
                <div class="pt-14 flex flex-col gap-y-2">
                    <div v-for="item in menuLoading" :key="item.id">
                        <NuxtLink :to="item.path" class="contents">
                            <Button variant="ghost" class="text-lg w-full font-extrabold justify-start pl-12"
                                :class="{ 'bg-[#E6F1FB] hover:bg-[#E6F1FB] dark:bg-[#1A2530] dark:text-blue-600 dark:hover:bg-[#1A2530] dark:hover:text-blue-600': isActive(item.path) }">
                                <span v-if="item.icon" class="mr-2">{{ item.icon }}</span>
                                {{ item.name }}
                            </Button>
                        </NuxtLink>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
        <NuxtLink class="text-nowrap" to="/">
            <h1 class="text-3xl font-extrabold flex gap-4 items-center">
                <Icon name="fluent-emoji-flat:infinity" class=" h-10 w-10"></Icon>
                <span class="hidden sm:block">农业 AI 服务</span>
            </h1>
        </NuxtLink>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { menus, manage } from '@/utils/menus'
const route = useRoute();

const menuLoading = computed(() => {
    return menus.some(obj => route.path.includes(obj.id)) ? menus : manage;
});
const isActive = (path) => route.path.startsWith(path);

</script>

<style scoped>
/* button[data-state='on'] {
  @apply border-2 border-primary;
} */
</style>
