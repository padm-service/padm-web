<template>
    <div class="flex flex-col flex-1">
        <div class="border-b  border-opacity-10 ">
            <div class="container container-xl pb-2 ">
                <ContainerHeader title="费用账单"></ContainerHeader>
                <div class="flex flex-row gap-2">
                    <div v-for="link in links" :key="link.id">
                        <div :class="[
                            'p-2',
                            'transition-all',
                            'duration-100',
                            { 'border-b-2 border-blue-400': router.path.includes(link.id) }
                        ]">
                            <NuxtLink :to="`/bills/${link.id}`" class="contents">
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

<script lang="ts" setup>
const router = useRoute()
const links = [{ id: "month", name: "月度账单" },
{ id: "details", name: "费用明细" },
];
definePageMeta({
    layout: 'personal'
})
</script>
