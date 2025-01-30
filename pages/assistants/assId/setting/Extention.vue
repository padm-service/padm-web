<template>
    <span class="font-bold text-xl ">扩展</span>
    <div class="flex flex-col ">
        <Label for="knowledge" class="font-bold text-md">知识库</Label>
        <Select :model-value=knowledge>
            <SelectRoot class="mt-2 max-w-56">
                <SelectTrigger id="framework">
                    <SelectValue placeholder="请选择知识库" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="password">
                        默认（无）
                    </SelectItem>
                    <SelectItem value="OPT">
                        柑橘知识库
                    </SelectItem>
                    <SelectItem value="APIKEY">
                        草莓知识库
                    </SelectItem>
                </SelectContent>
            </SelectRoot>
        </Select>
    </div>
    <div>


        <span class="font-bold text-md">模型服务</span>
        <ScrollArea class="h-56 rounded-md border max-w-96 mt-2">
            <div class="p-4 ">
                <div v-for="tag in tags" :key="tag">
                    <div class="flex items-center gap-4">
                        <Checkbox id="terms" />
                        <label for="terms" class="text-md hover:text-blue-600 ">
                            冠层分支结构分析
                        </label>
                    </div>
                    <Separator class="my-2" />
                </div>
            </div>
        </ScrollArea>
    </div>
</template>
<script setup lang="ts">
const knowledge = "";
const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
)
</script>