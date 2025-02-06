<template>
    <div class="container container-xl">
        <Header></Header>
        <Description></Description>
        <Table></Table>
    </div>
</template>

<script lang="ts" setup>
import Header from './header.vue';
import Description from './description.vue';
import Table from './table.vue'
definePageMeta({
    layout: 'personal'
})
</script>
