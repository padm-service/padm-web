<template>
    <div class="app">
        <Header />
        <div class="h-full flex overflow-y-hidden">
            <Menu :menuItems="menuItems">
            </Menu>
            <slot class="" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { menus } from '@/utils/menus'
const menuItems = menus;
</script>

<style></style>
