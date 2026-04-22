<template>
    <aside class="w-56 border-r border-gray-700 p-4 ">
                <div v-for="item in itemData" class="transition-all duration-200">
                    <div class="flex items-center justify-between p-3 cursor-pointer transition-colors rounded"
                               @click="toggleItem(item.path)">
                            <div class="flex items-center gap-3">
                                    <div class="font-medium dark:text-white">{{ item.path }}</div>
                             </div>
                         <Icon v-if="item.summary"
                                  name="mdi:chevron-down" 
                                  class="h-4 w-4 dark:text-gray-400 transition-transform duration-200 flex-shrink-0"
                                  :class="{ 'rotate-180': openItems[item.path] }" />
                     </div>
                     <div v-if="openItems[item.path] && item.summary"
                                         class="ml-6   border-gray-800">
                             <a href="javascript:void(0)"
                                     class="flex items-center gap-2 px-6 py-2 hover:bg-accent text-lg"
                                     :class="{
                                              'dark:text-blue-600 font-bold': activeItem === item.summary,
                                              'dark:text-white': activeItem !== item.summary
                                            }"
                                      @click="handleApiClick(item)">
                                <div class="flex-1">
                                        <div class="text-sm">{{ item.summary }}</div>
                                </div>
                            </a>
                    </div>
                </div>
            </aside>
</template>
<script setup lang="ts">
import { useApiStore } from '@/stores/sidebardoc'
const apiStore = useApiStore()
const { getService } = useServices();
const { service } = storeToRefs(serviceStore());
const loading = ref(false);
const route = useRoute();
onMounted(async () => {
    service.value = await getService(route.params.id as string);
    loading.value = true;
    
    console.log('service:',service.value);
    console.log('serviceid:',service.value.id);

});
const serviceId = computed(() => service.value?.id ?? '')
const paths = computed(() => {
    return service.value?.schema?.paths || {};
});
const itemData = computed(() => {
    const tagMap = {}
    
    if (!service.value?.schema?.paths) return tagMap
  const result: Array<{
    path: string
    method: string
    summary: string
    description: string
    operationId: string
    tags: string[]
    parameters?: any[]
    requestBody?: any
    responses?: any
    expanded?: boolean
  }> = []
  
  if (!service.value?.schema?.paths) return result
  
  const paths = service.value.schema.paths
  const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options']
  
  // 遍历所有路径
  Object.entries(paths).forEach(([path, pathItem]) => {
    if (!pathItem) return
    
    // 遍历该路径下的所有HTTP方法
    httpMethods.forEach(method => {
      const operation = (pathItem as Record<string, any>)[method]
      if (operation) {
            const requestBody = operation.requestBody ? {
            description: operation.requestBody.description || '',
            required: operation.requestBody.required || false,
            content: operation.requestBody.content ? Object.entries(operation.requestBody.content).map(([contentType, content]) => ({
              contentType,
              schema: content.schema || {},
              examples: content.examples || {}
            })) : []
          } : null

            const responses = operation.responses ? Object.entries(operation.responses).map(([statusCode, response]) => {
            const responseContent = response.content ? Object.entries(response.content).map(([contentType, content]) => ({
              contentType,
              schema: content.schema || {},
              examples: content.examples || {},
              encoding: content.encoding || {}
            })) : []
            
            const responseHeaders = response.headers ? Object.entries(response.headers).map(([headerName, header]) => ({
              name: headerName,
              description: header.description || '',
              schema: header.schema || {},
              required: header.required || false
            })) : []

            return {
              statusCode,
              description: response.description || '',
              content: responseContent,
              headers: responseHeaders,
              links: response.links || {}
            }
          }) : []
        result.push({
          path: path,
          method: method.toUpperCase(),
          summary: operation.summary || path,
          description: operation.description || '暂无描述',
          operationId: operation.operationId || `${method}_${path.replace(/\//g, '_')}`,
          tags: operation.tags || [],
          parameters: operation.parameters || [],
          requestBody: requestBody,
          responses: responses,
          expanded: false
        })
      }
    })
  })
  
  // 按路径和方法排序
  result.sort((a, b) => {
    // 先按路径排序
    if (a.path < b.path) return -1
    if (a.path > b.path) return 1
    
    // 路径相同按方法排序
    const methodOrder: Record<string, number> = {
      'GET': 1, 'POST': 2, 'PUT': 3, 'DELETE': 4, 
      'PATCH': 5, 'HEAD': 6, 'OPTIONS': 7
    }
    return (methodOrder[a.method] || 99) - (methodOrder[b.method] || 99)
  })
  
  return result
});
// 折叠状态管理
const openItems = reactive<Record<string, boolean>>({})

// 切换折叠状态
const toggleItem = (operationId: string) => {
  if (operationId) {
    openItems[operationId] = !openItems[operationId]
  }
} 
const activeItem = ref(null)
const handleApiClick = (child) => {
  // 更新 Pinia store 中的当前API
 
  activeItem.value = child.summary
  apiStore.setCurrentApi(child)
  console.log('点击 API:', child)
}
 


 

</script>
