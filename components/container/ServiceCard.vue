<template>
    <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4  overflow-y-auto sb-none">
        <div class="p-4 border  rounded-md flex gap-2 hover:border-blue-500  cursor-text relative ">
            <span class="text-3xl md:text-5xl  flex">🌲</span>
            <div>
                <h3>
                    <NuxtLink to="/services/id/setting" class="text-xl font-extrabold hover:text-blue-500"> 未命名模型
                    </NuxtLink>
                </h3>
                <p class="pt-2">冠层分支结构分析模型</p>
                <div class="flex gap-2 flex-wrap pt-2">
                    <Badge variant="secondary">
                        类型/图像
                    </Badge>
                    <Badge variant="secondary">
                        作物/通用
                    </Badge>
                </div>
                <div class="p-1 absolute top-0 right-0 bg-blue-500  rounded-tr-md rounded-bl-md text-white">
                    最新模型
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>