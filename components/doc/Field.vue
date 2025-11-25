<template>
     <div class="border-l pl-4 ml-4 gap-2 flex flex-col">
        <div v-if="currentApi?.parameters?.length > 0">
            <div v-for="param in currentApi.parameters" :key="param.name" class="flex justify-between mb-3">
                <div class="text-sm font-semibold">
                    {{ param.name }}
                    <span class="ml-2 font-normal">{{ param.type }}</span>
                    <p class="dark:text-gray-400 text-gray-500 text-xs">{{ param.description }}</p>
                </div>
                <Badge v-if="param.required" variant="outline" class="bg-[#00ffbf] bg-opacity-10">
                    Required
                </Badge>       
            </div>
        </div>
        <div v-else class="text-gray-500 text-sm">
            暂无参数
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useApiStore } from '@/stores/sidebardoc'

const apiStore = useApiStore()
const currentApi = computed(() => apiStore.currentApi || {})
</script>