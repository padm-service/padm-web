<template>
    <div class="app">
        <Header />
        <div class="h-full flex overflow-y-hidden">
            <Menu :menuItems="manage">
            </Menu>
            <slot class="" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { manage } from '@/utils/menus'
</script>

<style></style>
