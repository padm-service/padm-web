<template>
    <div class=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-4  overflow-y-auto sb-none">
        <div v-for="service in serviceList" :key="service.id"
            class="p-4 border  rounded-md flex gap-2 hover:border-blue-500  cursor-text relative ">
            <span class="text-4xl md:text-3xl  flex"> {{ service?.icon }}</span>
            <div>
                <h3>
                    <NuxtLink :to="`/services/${service.id}/setting`"
                        class="font-extrabold text-md  hover:text-blue-500">
                        {{ toJson(service.schema)?.info?.title }}
                    </NuxtLink>
                </h3>
                <p class="pt-2 text-sm">{{ toJson(service.schema)?.info?.description ?? "-" }}</p>
                <div class="flex gap-2 flex-wrap pt-2">
                    <Badge variant="secondary" v-for="tag in toJson(service.schema)?.tags ?? []" :key="tag.name">
                        {{ tag?.name }}
                    </Badge>
                </div>
                <div class="p-1 absolute top-0 right-0 bg-blue-500  rounded-tr-md rounded-bl-md text-white">
                    最新模型
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { serviceList } = storeToRefs(serviceStore());
</script>