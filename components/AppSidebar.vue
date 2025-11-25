<template>
  <Sidebar class="border-r w-full md:w-64">
    <SidebarContent>
      <SidebarGroup>
         <!-- <button class="text-left">返回</button> -->
        <SidebarGroupContent>
          <SidebarMenu>
            <template v-for="item in sidebarData" :key="getItemKey(item)">
              <SidebarMenuItem v-if="!item.children">
                <SidebarMenuButton as-child>
                  <a :href="item.url" class="flex items-center gap-2 px-6 py-2 hover:bg-accent text-lg">
                    <span>{{ item.title }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <Collapsible v-else v-slot:default="{ open }" class="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton class="flex items-center gap-2 px-6 py-2 hover:bg-accent text-lg">
                      <!-- <component :is="item.icon" class="h-4 w-4" /> -->
                      <span>{{ item.title }}</span>
                      <ChevronRight class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" /> 
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem v-for="child in item.children" :key="child.title">
                        <SidebarMenuButton as-child>
                          <a :href="child.url" class="flex items-center gap-2 px-6 py-2 hover:bg-accent text-lg"
                          :class="{
                                      'dark:text-blue-600 font-bold': activeChild === child.title,
                                      'dark:text-white': activeChild !== child.title
                                  }"
                          @click="handleApiClick(child)"
                          >
                            <span>{{ child.title }}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </template>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<script setup lang="ts">
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Home, Users, ShoppingCart, BarChart, Settings, ChevronRight } from 'lucide-vue-next'
import type { OpenAPIObject, OperationObject, PathItemObject } from "openapi3-ts/oas31";

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

const activeChild = ref('')
// 处理 API 点击
const handleApiClick = (child) => {
  activeChild.value = child.title
  // 更新 Pinia store 中的当前API
  apiStore.setCurrentApi(child)
  
  console.log('点击 API:', child)
}

// 加载数据
const loadApiData = async () => {
  try {
    loading.value = true
    await apiStore.fetchApiData()
    
    // 默认展开第一个分类
    if (sidebarData.value.length > 0) {
      const firstItem = sidebarData.value[0]
      if (firstItem.title) {
        openItems[firstItem.title] = true
      }
    }
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
