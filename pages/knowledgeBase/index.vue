<template>
    <ScrollArea class="flex-1 overflow-x-hidden">
        <div class="container container-2xl sb-none overflow-y-auto ">
            <Header></Header>
            <Table></Table>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import Header from './header.vue'
import Table from './table.vue'
definePageMeta({
    layout: 'router'
})

</script>