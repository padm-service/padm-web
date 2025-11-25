<template>
    <div>
          <div class="flex items-center justify-between">
                <span class="text-2xl font-bold my-4">响应</span>
                <div v-if="currentApi?.responses?.length > 0"class="flex gap-2">
                    <Badge v-for="param in currentApi.responses" :key="param?.statusCode" variant="outline" 
                    class="rounded-md px-2 py-1 text-xs border-gray-100" 
                    :class="{
            'border-green-500 text-white': selectedStatusCode === param?.statusCode,
            'bg-gray-100 dark:bg-gray-800': selectedStatusCode !== param?.statusCode
          }"
                    @click="selectStatusCode(param?.statusCode)">
                        {{ param.statusCode}}
                    </Badge>
                </div>
            </div>
            <p v-if="selectedResponse" class="dark:text-gray-400 text-gray-500 text-md">{{ selectedResponse.description}}</p>

        <div>
            <div class="flex items-center justify-between">
                <span class="text-2xl font-bold my-4">Body</span>
                <Select>
                    <SelectTrigger class="max-w-40 h-8 text-center">
                        <SelectValue placeholder="application/json" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="apple" class="!h-6">
                                Apple
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <DocField3 :responseData="selectedResponse" ></DocField3>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useApiStore } from '@/stores/sidebardoc'
//import { ref, computed } from 'vue'
const apiStore = useApiStore()
const currentApi = computed(() => apiStore.currentApi || {})



//默认选中第一个状态码
const selectedStatusCode = ref(currentApi.value.responses?.[0]?.statusCode || null)

// 计算属性：获取当前选中的响应对象
const selectedResponse = computed(() => {
  if (!selectedStatusCode.value || !currentApi.value?.responses) return null
  return currentApi.value.responses.find(
    response => response.statusCode === selectedStatusCode.value
  )
})

// 选择状态码的方法
const selectStatusCode = (statusCode) => {
  selectedStatusCode.value = statusCode
}
</script>