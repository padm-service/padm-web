<template>
    <nav class="hidden border-r  border-opacity-15 sm:flex sm:flex-col md:w-64">
        <ul class="space-y-2 py-8 ">
            <li v-for="item in menuItems" :key="item.id" class="px-4 ">
                <Button variant="ghost" class="text-lg w-full font-extrabold"
                    :class="{ 'bg-[#E6F1FB] hover:bg-[#E6F1FB] dark:bg-[#1A2530] dark:text-blue-600 dark:hover:bg-[#1A2530] dark:hover:text-blue-600': isActive('/' + item.id) }">
                    <NuxtLink :to="'/' + item.id" class="w-full flex  justify-start pl-8">
                        <span v-if="item.icon" class="mr-2">{{ item.icon }}</span>
                        {{ item.name }}
                    </NuxtLink>
                </Button>
            </li>
        </ul>
    </nav>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
    menuItems: Array,
});

const route = useRoute();

const isMenuOpen = ref(false);

const isActive = (path) => route.path.startsWith(path);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>