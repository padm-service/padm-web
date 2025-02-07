<template>
    <ScrollArea>
        <div class="container container-xl ">
            <div class="flex">
                <MonthRangeCalendar></MonthRangeCalendar>
            </div>
            <MonthTable></MonthTable>
        </div>
    </ScrollArea>
</template>

<script setup lang="ts">

import MonthRangeCalendar from './monthRangeCalendar.vue'
import MonthTable from './monthTable.vue';
</script>