<template>
    <ScrollArea class="flex-1 overflow-x-hidden">
        <div class="container container-2xl">
            <Header></Header>
            <DataTable></DataTable>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import Header from './header.vue';
import DataTable from './dataTable.vue';
const { partitionList } = storeToRefs(partitionStore());
const { getPartitions } = usePartitions();
const route = useRoute();
definePageMeta({
    layout: 'router'
})
onMounted(async () => {
    partitionList.value = await getPartitions(route.params.id as string);
})
</script>