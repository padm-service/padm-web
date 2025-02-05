<template>
    <div class="flex flex-col flex-1">
        <div class="border-b  border-opacity-10 ">
            <div class="container container-xl pb-2 ">
                <ContainerHeader title="🌲 冠层分支结构分析"></ContainerHeader>
                <div class="flex flex-row gap-2">
                    <div v-for="link in links" :key="link.id">
                        <Toggle aria-label="Toggle bold" class="text-lg font-bold"
                            :pressed="router.path.includes(link.id)">
                            <NuxtLink :to="`/services/id/${link.id}`" class="w-full min-w-20"
                                activeClass="border-b-2 border-blue-400">
                                <span>{{ link.name }}</span>
                            </NuxtLink>
                        </Toggle>
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