<template>
    <nav class="hidden border-r  border-opacity-15 sm:flex sm:flex-col md:w-64">
        <ul>
            <li>
                <ul class="space-y-2 py-8 ">
                    <li v-for="item in menuItems" :key="item.path" class="px-4 ">
                        <NuxtLink :to="item.path" class="contents">
                            <Button variant="ghost" class="text-lg w-full font-extrabold justify-start pl-12"
                                :class="{ 'bg-[#E6F1FB] hover:bg-[#E6F1FB] dark:bg-[#1A2530] dark:text-blue-600 dark:hover:bg-[#1A2530] dark:hover:text-blue-600': isActive(item.path) }">
                                <span v-if="item.icon" class="mr-2">{{ item.icon }}</span>
                                {{ item.name }}
                            </Button>
                        </NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>
<script setup>
import { useRoute } from "vue-router";
const { apiDoc, apiDocList } = storeToRefs(apiDocStore());
const props = defineProps({
    menuItems: Array,
});
onMounted(() => {
    // const { groups } = apiDoc.value;
    // console.log(apiDoc.value);
})
const route = useRoute();

const isActive = (path) => route.path.startsWith(path);

</script>