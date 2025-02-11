<template>
    <ScrollArea class="flex-1 ">
        <div class="container container-2xl">
            <Header></Header>
            <DataTable></DataTable>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import Header from './header.vue';
import DataTable from './dataTable.vue';
definePageMeta({
    layout: 'router'
})

</script>