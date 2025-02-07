<template>
    <div class="flex sm:gap-4 flex-col sm:flex-row gap-2">
        <MonthCalendar></MonthCalendar>
        <div class="relative  max-w-72 items-center">
            <Input id="search" type="text" placeholder="输入模型名" class="pl-10 h-9" />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <Icon name="si:search-duotone" class="w-7 h-7"></Icon>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import MonthCalendar from './monthCalendar.vue';
</script>