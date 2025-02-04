<template>
    <div class="container container-2xl sb-none overflow-y-auto ">
        <Header></Header>
        <Table></Table>
    </div>

</template>

<script lang="ts" setup>
import Header from './header.vue'
import Table from './table.vue'
definePageMeta({
    layout: 'router'
})

</script>
