<template>
    <div class="app">
        <Header />
        <div class="h-full flex overflow-y-hidden">
            <Menu :menuItems="menus">
            </Menu>
            <slot class="" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { menus } from '@/utils/menus'

</script>

<style></style>
