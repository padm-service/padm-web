<template>
    <div class="grid gap-4">
        <div class="w-full overflow-x-auto">
            <header
                class="flex justify-between items-center rounded-t-lg border p-1.5 pl-2 bg-alpha-500 bg-opacity-10 bg-[#0d80f2]">
                <div class="text-sm font-semibold">代码示例</div>
                <div class="gap-2 flex">
                    <Select>
                        <SelectTrigger class="max-w-40 h-8 text-center">
                            <SelectValue placeholder="application/json" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple" class="!h-6">
                                    Shell / cURL
                                </SelectItem>
                                <SelectItem value="apples" class="!h-6">
                                    JavaScript / Fetch
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost">
                        <Icon name="solar:copy-line-duotone"
                            class="cursor-pointer w-5 h-5 transition-colors bg-green-600 ">
                        </Icon>
                    </Button>
                </div>
            </header>
            <div class="p-2 text-[13px] font-[18px] overflow-x-auto sb-none rounded-b-md border">
                <ContainerMarkdown
                    :content="formattedCode">
                </ContainerMarkdown>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useApiStore } from '@/stores/sidebardoc'

const apiStore = useApiStore()

const formatCurlCommand = (command: string) => {
  if (!command) return ''
  
  return command
    .replace(/--request\s+(\w+)/, '--request $1 \\\n  ')
    .replace(/--url\s+([^\s]+)/, '--url $1 \\\n  ')
    .replace(/--header\s+'([^']+)'/, "--header '$1'")
    .trim()
}

const formattedCode = computed(() => {
  const currentApi = apiStore.currentApi
  
  if (!currentApi?.path) {
    return '# 请选择 API 接口查看代码示例'
  }
  
  const method = currentApi.method || 'GET'
  const path = currentApi.path
  const baseUrl = 'https://api.platform.archivemodel.cn'
  
const rawCode = `curl --request ${method} --url ${baseUrl}${path} --header 'X-API-Key: Your API Key'`
//    const rawCode=`const options = {
//   method: "${method}",
//   headers: {
//     "X-API-Key": "Your API Key",
//     "Content-Type": "application/json"
//   },
// };
// fetch("${baseUrl}${path}", options);`
  
  return formatCurlCommand(rawCode)
})
</script>