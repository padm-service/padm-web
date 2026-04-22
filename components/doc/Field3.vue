<template>
     <div class="border-l pl-4 ml-4 gap-2 flex flex-col">
        <div v-if="responseData?.content?.length">
            <div v-for="content in responseData.content" :key="content.contentType">
                <div v-if="content.schema?.properties">
                    <div v-for="(prop, propName) in content.schema.properties" :key="propName" class="flex justify-between mb-3" >
                            <div class="text-sm font-semibold">
                                     {{ propName }}
                                    <span class="ml-2 font-normal">{{ prop.type }}</span>
                            </div>
                            <Badge v-if="propName" variant="outline" class="bg-[#00ffbf] bg-opacity-10">
                                   Required
                            </Badge>   

                    </div>

                </div>
                    
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
defineProps({
  responseData: {
    type: Object,
    default: () => ({})
  }
})



</script>