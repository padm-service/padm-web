<template>
    <div class="flex flex-col flex-1">
        <div class="border-b  border-opacity-10 ">
            <div class="container container-xl pb-2 ">
                <ContainerHeader title="🌲 冠层分支结构分析"></ContainerHeader>
                <div class="flex flex-row gap-2">
                    <div v-for="link in links" :key="link.id">
                        <div :class="[
                            'p-2',
                            'transition-all',
                            'duration-100',
                            { 'border-b-2 border-blue-400': router.path.includes(link.id) }
                        ]">
                            <NuxtLink :to="`/services/id/${link.id}`" class="contents">
                                <Toggle aria-label="Toggle bold" class="text-lg font-bold"
                                    :pressed="router.path.includes(link.id)">
                                    <span>{{ link.name }}</span>
                                </Toggle>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NuxtPage></NuxtPage>
    </div>
</template>

<script setup lang="ts">


const router = useRoute()
definePageMeta({
    layout: 'router'
});
const links = [{ id: "doc", name: "文档" },
{ id: "setting", name: "设置" },
{ id: "node", name: "节点" }
];
// if (user?.id === data.service.user) {
// links.push({ id: "settings", name: "设置" });
// links.push({ id: "nodes", name: "节点" });
// }
</script>