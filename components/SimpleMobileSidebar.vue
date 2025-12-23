<template>
  <div class="h-full overflow-auto dark:bg-black dark:text-white">
    <div class="p-4">
      <div class="space-y-1">
        <div v-for="item in sidebarData" :key="getItemKey(item)" 
             class="transition-all duration-200">
          <div class="flex items-center justify-between p-3 cursor-pointer transition-colors rounded"
               @click="toggleItem(item.title)">
            <div class="flex items-center gap-3">
              <div class="font-medium dark:text-white">{{ item.title }}</div>
            </div>
            <Icon v-if="item.children && item.children.length > 0"
                  name="mdi:chevron-down" 
                  class="h-4 w-4 dark:text-gray-400 transition-transform duration-200 flex-shrink-0"
                  :class="{ 'rotate-180': openItems[item.title] }" />
          </div>
          <div v-if="openItems[item.title] && item.children && item.children.length > 0"
               class="ml-6   border-gray-800">
            <a v-for="child in item.children" 
               :key="getChildKey(child)"
               href="javascript:void(0)"
               class="flex items-center p-2 px-4 transition-colors hover:text-lg"
               :class="{
                                              'dark:text-blue-600 font-bold': activeItem === child.title,
                                              'dark:text-white': activeItem !== child.title
                                            }"
               @click="handleApiClick(child)">
              <div class="flex-1">
                <div class="text-sm">{{ child.title }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useApiStore } from '@/stores/sidebardoc'


const apiStore = useApiStore()
const openItems = reactive({})
const loading = ref(false)

// 使用 store 的侧边栏数据
const sidebarData = computed(() => apiStore.getSidebarData())

// 安全的 key 生成
const getItemKey = (item) => {
  return item?.title || Math.random().toString(36).substr(2, 9)
}

const getChildKey = (child) => {
  return `${child.method}-${child.path}` || Math.random().toString(36).substr(2, 9)
}

// 切换分类展开/收起
const toggleItem = (title) => {
  if (title) {
    openItems[title] = !openItems[title]
  }
}
const activeItem = ref(null)
// 处理 API 点击
const handleApiClick = (child) => {
  // 更新 Pinia store 中的当前API
  activeItem.value = child.title
  apiStore.setCurrentApi(child)
  console.log('点击 API:', child)
}

// 加载数据
const loadApiData = async () => {
  try {
    loading.value = true
    await apiStore.fetchApiData()
    

  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadApiData()
})
</script>

 