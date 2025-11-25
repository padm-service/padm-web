<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue"
import { SidebarProvider } from "@/components/ui/sidebar"
</script>

<template>
  <nav class="hidden border-r  border-opacity-15 sm:flex sm:flex-col md:w-64">
  <SidebarProvider class="!w-80 pt-8"> 
    <AppSidebar class="mt-20 " />
  </SidebarProvider>  
  </nav>
  
</template>