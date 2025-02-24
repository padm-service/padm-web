<template>
    <div>
        <div class="flex items-center gap-2 sm:gap-4">
            <Input v-model="searchKeyword" type="text" placeholder="请输入关键词"
                class="max-w-40 sm:max-w-56 min-w-40 dark:bg-[#313131] bg-[#e8e8e8]" />
            <Select v-model="selectedFileType">
                <SelectTrigger class="dark:bg-[#313131] bg-[#e8e8e8] w-30">
                    <SelectValue placeholder="请选择知识库" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="all">全部文件</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="word">DOC\DOCX</SelectItem>
                    <SelectItem value="ppt">PPT\PPTX</SelectItem>
                    <SelectItem value="txt">TXT\MD</SelectItem>
                    <SelectItem value="excel">XLSX\XLS\CSV</SelectItem>
                </SelectContent>
            </Select>

            <!-- 批量操作 -->
            <DropdownMenu v-model:open="batchState">
                <DropdownMenuTrigger as-child class="dark:bg-[#313131] bg-[#e8e8e8]">
                    <Button variant="outline">批量管理</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="min-w-0">
                    <DropdownMenuGroup>
                        <Dialog v-model:open="expireState">
                            <DialogTrigger as-child>
                                <Button class="flex justify-center" variant="ghost">
                                    <Icon name="fluent-mdl2:date-time-2" class="bg-blue-500" /> 时效
                                </Button>
                            </DialogTrigger>
                            <DialogContent class="w-5/6 sm:max-w-md flex flex-col gap-5 rounded-md pt-4">
                                <DialogHeader>
                                    <DialogTitle>时效设置</DialogTitle>
                                    <DialogDescription>
                                        设定该知识库的有效状态
                                    </DialogDescription>
                                </DialogHeader>
                                <Button variant="outline" @click="handleBatch('expire', { expire: 'normal' })">
                                    永久有效
                                </Button>
                                <Button variant="outline" @click="handleBatch('expire', { expire: 'disable' })">
                                    禁用
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <DropdownMenuItem class="flex justify-center" @click="handleBatch('download')">
                            <Icon name="ci:download" class="bg-blue-500" /> 下载
                        </DropdownMenuItem>
                        <AlertDialog v-model:open="delState">
                            <AlertDialogTrigger as-child>
                                <Button variant="ghost" class="flex justify-center">
                                    <Icon name="fluent:delete-32-filled" class="bg-red-600 dark:bg-red-800" /> 删除
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle class="text-red-500">
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        此操作无法撤消！这将从服务器中删除该文件的相关数据。
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>取消</AlertDialogCancel>
                                    <Button variant="destructive" @click="handleBatch('delete')">删除</Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <!-- 数据表格 -->
        <div class="rounded-md border mt-8 overflow-x-auto">
            <Table class="text-md">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox :checked="isAllSelected" :indeterminate="isIndeterminate"
                                @update:checked="toggleAllSelection" />
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">
                            文件名
                        </TableHead>
                        <TableHead class="text-sm sm:text-base ">文件大小</TableHead>
                        <TableHead class="text-sm sm:text-base  ">文件状态</TableHead>
                        <TableHead class="text-sm sm:text-base">有效状态</TableHead>
                        <TableHead class="text-sm sm:text-base cursor-pointer" @click="toggleSort('created_at')">
                            上传时间
                            <Icon v-if="sortBy === 'created_at'"
                                :name="sortDirection === 'asc' ? 'material-symbols:arrow-upward' : 'material-symbols:arrow-downward'"
                                class="w-4 h-4 ml-1" />
                        </TableHead>
                        <TableHead class="text-sm sm:text-base cursor-pointer" @click="toggleSort('updated_at')">更新时间
                            <Icon v-if="sortBy === 'updated_at'"
                                :name="sortDirection === 'asc' ? 'material-symbols:arrow-upward' : 'material-symbols:arrow-downward'"
                                class="w-4 h-4 ml-1" />
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="partition in paginatedData" :key="partition.id" class="items-center">
                        <TableCell class="w-5">
                            <Checkbox :checked="selectedIds.includes(partition.id)"
                                @update:checked="checked => toggleSelection(partition.id, checked)" />
                        </TableCell>
                        <TableCell>
                            <ContainerKnowledgeIcon :invoice="partition" />
                        </TableCell>
                        <TableCell>
                            {{ fileBytes(partition.size) }}
                        </TableCell>
                        <TableCell>
                            <span :class="{
                                'text-green-600 bg-green-100 dark:bg-green-700 dark:text-green-200 p-1 rounded-sm': partition.state === 'done',
                                'text-blue-600 bg-blue-100 dark:bg-blue-700 dark:text-blue-200 p-1 rounded-sm': partition.state === 'pending'
                            }">
                                {{ partition.state ===
                                    'done'
                                    ? '数据完成' : "正在向量化" }}
                            </span>
                        </TableCell>
                        <TableCell><span :class="{
                            'text-green-600 bg-green-100 dark:bg-green-700 dark:text-green-200 p-1 rounded-sm': partition.expire === 'normal',
                            'text-red-600 bg-red-100 dark:bg-red-700 dark:text-red-200 p-1 rounded-sm': partition.expire === 'disable'
                        }">{{ partition.expire === "normal" ? '永久有效' : "禁用中" }}</span></TableCell>
                        <TableCell>{{ convertDateTime(partition.created_at) }}</TableCell>
                        <TableCell>{{ convertDateTime(partition.updated_at) }}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button size="icon" variant="ghost">
                                        <Icon name="fa-solid:ellipsis-h" class="text-blue-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="min-w-0">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem class="flex justify-center"
                                            @click="handleAction(partition.id, 'time')">
                                            <Icon name="fluent-mdl2:date-time-2" class="text-blue-500 mr-2" /> 时效
                                        </DropdownMenuItem>
                                        <DropdownMenuItem class="flex justify-center"
                                            @click="handleAction(partition.id, 'download')">
                                            <Icon name="ci:download" class="text-blue-500 mr-2" /> 下载
                                        </DropdownMenuItem>
                                        <DropdownMenuItem class="flex justify-center"
                                            @click="handleAction(partition.id, 'delete')">
                                            <Icon name="fluent:delete-32-filled"
                                                class="text-red-600 dark:text-red-800 mr-2" /> 删除
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <Pagination v-if="filteredData.length >= 8" :sibling-count="1" show-edges :default-page="1"
            v-model:page="currentPage" :total="filteredData.length" :items-per-page="pageSize"
            class="flex justify-center mt-4">
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst />
                <PaginationPrev />
                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                        <Button class="w-10 h-10 p-0" :variant="item.value === currentPage ? 'default' : 'outline'">
                            {{ item.value }}
                        </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>
                <PaginationNext />
                <PaginationLast />
            </PaginationList>
        </Pagination>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner';
const batchState = ref(false);
const delState = ref(false);
const expireState = ref(false);
const { partitionList } = storeToRefs(partitionStore());
const route = useRoute();
const searchKeyword = ref('')
const selectedFileType = ref('all')
const sortBy = ref<'created_at' | 'updated_at'>('created_at') // 修改排序字段类型
const sortDirection = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const pageSize = ref(8)
const selectedIds = ref<string[]>([])
const { deletePartition, updatePartition, getPartitions, updateBatchPartition, deleteBatchPartition } = usePartitions();
const getFileType = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase()
    switch (ext) {
        case 'pdf': return 'pdf'
        case 'doc':
        case 'docx': return 'word'
        case 'ppt':
        case 'pptx': return 'ppt'
        case 'txt':
        case 'md': return 'txt'
        case 'xlsx':
        case 'xls':
        case 'csv': return 'excel'
        default: return;
    }
}

// 过滤后的数据
const filteredData = computed(() => {
    return partitionList.value.filter(partition => {
        const matchesSearch = partition.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
        const matchesType = selectedFileType.value === 'all' || getFileType(partition.name) === selectedFileType.value
        return matchesSearch && matchesType
    })
})

const sortedData = computed(() => {
    return [...filteredData.value].sort((a, b) => {
        const getTimestamp = (item: any) =>
            new Date(sortBy.value === 'created_at' ? item.created_at : item.updated_at).getTime()
        const aTime = getTimestamp(a)
        const bTime = getTimestamp(b)
        return sortDirection.value === 'asc' ? aTime - bTime : bTime - aTime
    })
})

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return sortedData.value.slice(start, start + pageSize.value)
})

// 全选状态
const isAllSelected = computed(() =>
    paginatedData.value.length > 0 &&
    paginatedData.value.every(item => selectedIds.value.includes(item.id))
)

const isIndeterminate = computed(() =>
    selectedIds.value.length > 0 &&
    !isAllSelected.value
)

// 选择操作
const toggleAllSelection = (checked: boolean) => {
    selectedIds.value = checked
        ? paginatedData.value.map(item => item.id)
        : []
}

const toggleSelection = (id: string, checked: boolean) => {
    selectedIds.value = checked
        ? [...selectedIds.value, id]
        : selectedIds.value.filter(item => item !== id)
}

// 排序操作
const toggleSort = (field: 'created_at' | 'updated_at') => {
    if (sortBy.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortBy.value = field
        sortDirection.value = 'desc' // 默认新字段降序排列
    }
}

const handleAction = async (id: string, action: string, object?: object) => {
    switch (action) {
        case 'expire':
            await updatePartition(route.params.id as string, id, object as object);
            partitionList.value = await getPartitions(route.params.id as string);
            toast.success("修改成功");
            break;
        case 'delete':
            await deletePartition(route.params.id as string, id);
            partitionList.value = await getPartitions(route.params.id as string);
            delState.value = false;
            toast.success("修改成功");
            break;
        default:
            break;
    }
}

const handleBatch = async (action: string, object?: object) => {
    if (selectedIds.value.length === 0) {
        toast.info("未选择文件");
        batchState.value = false;
        return;
    }
    switch (action) {
        case 'expire':
            await updateBatchPartition(route.params.id as string, {
                ids: selectedIds.value, updates: object
            });
            partitionList.value = await getPartitions(route.params.id as string);
            expireState.value = false;
            toast.success("修改成功");
            break;
        case 'delete':
            await deleteBatchPartition(route.params.id as string, { ids: selectedIds.value });
            partitionList.value = await getPartitions(route.params.id as string);
            delState.value = false;
            toast.success("修改成功");
            break;
        default:
            break;
    }
    selectedIds.value = [];
    batchState.value = false;
}
</script>