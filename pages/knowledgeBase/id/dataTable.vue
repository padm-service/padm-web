<template>
    <div>
        <div class="flex items-center gap-2 sm:gap-4">
            <Input v-model="searchKeyword" type="text" placeholder="请输入关键词"
                class="max-w-40 sm:max-w-56 dark:bg-[#313131] bg-[#e8e8e8]" />
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
            <DropdownMenu>
                <DropdownMenuTrigger as-child class="dark:bg-[#313131] bg-[#e8e8e8]">
                    <Button variant="outline">批量管理</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="min-w-0">
                    <DropdownMenuGroup>
                        <DropdownMenuItem class="flex justify-center" @click="handleBatch('time')">
                            <Icon name="fluent-mdl2:date-time-2" class="bg-blue-500" /> 时效
                        </DropdownMenuItem>
                        <DropdownMenuItem class="flex justify-center" @click="handleBatch('download')">
                            <Icon name="ci:download" class="bg-blue-500" /> 下载
                        </DropdownMenuItem>
                        <DropdownMenuItem class="flex justify-center" @click="handleBatch('delete')">
                            <Icon name="fluent:delete-32-filled" class="bg-red-600 dark:bg-red-800" /> 删除
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <!-- 数据表格 -->
        <div class="rounded-md border mt-8">
            <Table class="text-md">
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-5">
                            <Checkbox :checked="isAllSelected" :indeterminate="isIndeterminate"
                                @update:checked="toggleAllSelection" />
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">
                            文件名
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">文件状态</TableHead>
                        <TableHead class="text-sm sm:text-base">有效状态</TableHead>
                        <TableHead class="text-sm sm:text-base cursor-pointer" @click="toggleSort('uploadTime')">
                            上传时间
                            <Icon v-if="sortBy === 'uploadTime'"
                                :name="sortDirection === 'asc' ? 'material-symbols:arrow-upward' : 'material-symbols:arrow-downward'"
                                class="w-4 h-4 ml-1" />
                        </TableHead>
                        <TableHead class="text-sm sm:text-base cursor-pointer" @click="toggleSort('uploadTime')">更新时间
                            <Icon v-if="sortBy === 'updateTime'"
                                :name="sortDirection === 'asc' ? 'material-symbols:arrow-upward' : 'material-symbols:arrow-downward'"
                                class="w-4 h-4 ml-1" />
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="item in paginatedData" :key="item.id" class="items-center">
                        <TableCell class="w-5">
                            <Checkbox :checked="selectedIds.includes(item.id)"
                                @update:checked="checked => toggleSelection(item.id, checked)" />
                        </TableCell>
                        <TableCell>
                            <ContainerKnowledgeIcon :invoice="item" />
                        </TableCell>
                        <TableCell>{{ item.paymentStatus }}</TableCell>
                        <TableCell>{{ item.paymentMethod }}</TableCell>
                        <TableCell>{{ formatDate(item.uploadTime) }}</TableCell>
                        <TableCell>{{ formatDate(item.updateTime) }}</TableCell>
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
                                            @click="handleAction(item, 'time')">
                                            <Icon name="fluent-mdl2:date-time-2" class="text-blue-500 mr-2" /> 时效
                                        </DropdownMenuItem>
                                        <DropdownMenuItem class="flex justify-center"
                                            @click="handleAction(item, 'download')">
                                            <Icon name="ci:download" class="text-blue-500 mr-2" /> 下载
                                        </DropdownMenuItem>
                                        <DropdownMenuItem class="flex justify-center"
                                            @click="handleAction(item, 'delete')">
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

        <Pagination :sibling-count="1" show-edges :default-page="1" v-model:page="currentPage"
            :total="filteredData.length" :items-per-page="pageSize" class="flex justify-center mt-4">
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

interface Invoice {
    id: string
    name: string
    paymentStatus: string
    paymentMethod: string
    uploadTime: number
    updateTime: number
}

// 响应式状态
const searchKeyword = ref('')
const selectedFileType = ref('all')
const sortBy = ref<'uploadTime' | 'updateTime'>('uploadTime') // 修改排序字段类型
const sortDirection = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const pageSize = ref(8)
const selectedIds = ref<string[]>([])

// 示例数据（添加时间戳）
const invoices = ref<Invoice[]>([
    {
        id: "854625412",
        name: "test_file1.pdf",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531199000,
        updateTime: 1672531200000
    },
    {
        id: "234567898",
        name: "test_file2.doc",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531198000,
        updateTime: 1672531199500
    },
    {
        id: "345678907",
        name: "test_file3.docx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531197000,
        updateTime: 1672531198000
    },
    {
        id: "456789016",
        name: "test_file4.ppt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531196000,
        updateTime: 1672531197000
    },
    {
        id: "567890125",
        name: "test_file5.pptx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531195000,
        updateTime: 1672531196000
    },
    {
        id: "678901234",
        name: "test_file6.txt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531194000,
        updateTime: 1672531195000
    },
    {
        id: "789012343",
        name: "test_file7.md",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531193000,
        updateTime: 1672531194000
    },
    {
        id: "890123452",
        name: "test_file8.xlsx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531192000,
        updateTime: 1672531193500
    },
    {
        id: "901234561",
        name: "test_file9.xls",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531191000,
        updateTime: 1672531192000
    },
    {
        id: "012345679",
        name: "test_file10.csv",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531190000,
        updateTime: 1672531191000
    },
    {
        id: "123456708",
        name: "test_file11.pdf",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531189000,
        updateTime: 1672531190000
    },
    {
        id: "234567817",
        name: "test_file12.doc",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531188000,
        updateTime: 1672531190000
    },
    {
        id: "345678926",
        name: "test_file13.docx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531187000,
        updateTime: 1672531189000
    },
    {
        id: "456789035",
        name: "test_file14.ppt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531186000,
        updateTime: 1672531189000
    },
    {
        id: "567890144",
        name: "test_file15.pptx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531185000,
        updateTime: 1672531189000
    },
    {
        id: "678901253",
        name: "test_file16.txt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531184000,
        updateTime: 1672531189000
    },
    {
        id: "789012362",
        name: "test_file17.md",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531183000,
        updateTime: 1672531190000
    },
    {
        id: "890123471",
        name: "test_file18.xlsx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531182000,
        updateTime: 1672531189000
    },
    {
        id: "901234589",
        name: "test_file19.xls",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531181000,
        updateTime: 1672531189000
    },
    {
        id: "012345697",
        name: "test_file20.csv",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531180000,
        updateTime: 1672531189000
    },
    {
        id: "123456709",
        name: "test_file21.pdf",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531179000,
        updateTime: 1672531187000
    },
    {
        id: "234567828",
        name: "test_file22.doc",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531178000,
        updateTime: 1672531187000
    },
    {
        id: "345678937",
        name: "test_file23.docx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531177000,
        updateTime: 1672531187000
    },
    {
        id: "456789046",
        name: "test_file24.ppt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531176000,
        updateTime: 1672531187000
    },
    {
        id: "567890155",
        name: "test_file25.pptx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531175000,
        updateTime: 1672531187000
    },
    {
        id: "678901264",
        name: "test_file26.txt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531174000,
        updateTime: 1672531187000
    },
    {
        id: "789012373",
        name: "test_file27.md",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531173000,
        updateTime: 1672531187000
    },
    {
        id: "890123482",
        name: "test_file28.xlsx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531172000,
        updateTime: 1672531187000
    },
    {
        id: "901234591",
        name: "test_file29.xls",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531171000,
        updateTime: 1672531187000
    },
    {
        id: "012345609",
        name: "test_file30.csv",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531170000,
        updateTime: 1672531187000
    },
    {
        id: "123456718",
        name: "test_file31.pdf",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531169000,
        updateTime: 1672531188000
    },
    {
        id: "234567827",
        name: "test_file32.doc",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531168000,
        updateTime: 1672531188000
    },
    {
        id: "345678936",
        name: "test_file33.docx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531167000,
        updateTime: 1672531188000
    },
    {
        id: "456789045",
        name: "test_file34.ppt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531166000,
        updateTime: 1672531188000
    },
    {
        id: "567890154",
        name: "test_file35.pptx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531165000,
        updateTime: 1672531188000
    },
    {
        id: "678901263",
        name: "test_file36.txt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531164000,
        updateTime: 1672531188000
    },
    {
        id: "789012372",
        name: "test_file37.md",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531163000,
        updateTime: 1672531188000
    },
    {
        id: "890123481",
        name: "test_file38.xlsx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531162000,
        updateTime: 1672531188000
    },
    {
        id: "901234599",
        name: "test_file39.xls",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531161000,
        updateTime: 1672531188000
    },
    {
        id: "012345617",
        name: "test_file40.csv",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531160000,
        updateTime: 1672531188000
    },
    {
        id: "123456726",
        name: "test_file41.pdf",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531159000,
        updateTime: 1672531190000
    },
    {
        id: "234567835",
        name: "test_file42.doc",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531158000,
        updateTime: 1672531189000
    },
    {
        id: "345678944",
        name: "test_file43.docx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531157000,
        updateTime: 1672531190000
    },
    {
        id: "456789053",
        name: "test_file44.ppt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531156000,
        updateTime: 1672531190000
    },
    {
        id: "567890162",
        name: "test_file45.pptx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531155000,
        updateTime: 1672531190000
    },
    {
        id: "678901271",
        name: "test_file46.txt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531154000,
        updateTime: 1672531190000
    },
    {
        id: "789012380",
        name: "test_file47.md",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531153000,
        updateTime: 1672531190000
    },
    {
        id: "890123489",
        name: "test_file48.xlsx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531152000,
        updateTime: 1672531190000
    },
    {
        id: "901234598",
        name: "test_file49.xls",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531151000,
        updateTime: 1672531190000
    },
    {
        id: "012345616",
        name: "test_file50.csv",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531150000,
        updateTime: 1672531190000
    },
    {
        id: "012345617",
        name: "test_file40.csv",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531160000,
        updateTime: 1672531188000
    },
    {
        id: "123456726",
        name: "test_file41.pdf",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531159000,
        updateTime: 1672531190000
    },
    {
        id: "234567835",
        name: "test_file42.doc",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531158000,
        updateTime: 1672531189000
    },
    {
        id: "345678944",
        name: "test_file43.docx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531157000,
        updateTime: 1672531190000
    },
    {
        id: "456789053",
        name: "test_file44.ppt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531156000,
        updateTime: 1672531190000
    },
    {
        id: "567890162",
        name: "test_file45.pptx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531155000,
        updateTime: 1672531190000
    },
    {
        id: "678901271",
        name: "test_file46.txt",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531154000,
        updateTime: 1672531190000
    },
    {
        id: "789012380",
        name: "test_file47.md",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531153000,
        updateTime: 1672531190000
    },
    {
        id: "890123489",
        name: "test_file48.xlsx",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531152000,
        updateTime: 1672531190000
    },
    {
        id: "901234598",
        name: "test_file49.xls",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531151000,
        updateTime: 1672531190000
    },
    {
        id: "012345616",
        name: "test_file50.csv",
        paymentStatus: "Paid",
        paymentMethod: "有效",
        uploadTime: 1672531150000,
        updateTime: 1672531190000
    },
])

// 文件类型映射
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
        default: return 'other'
    }
}

// 过滤后的数据
const filteredData = computed(() => {
    return invoices.value.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
        const matchesType = selectedFileType.value === 'all' || getFileType(item.name) === selectedFileType.value
        return matchesSearch && matchesType
    })
})

// 排序后的数据
const sortedData = computed(() => {
    return [...filteredData.value].sort((a, b) => {
        const compareValueA = sortBy.value === 'uploadTime' ? a.uploadTime : a.updateTime
        const compareValueB = sortBy.value === 'uploadTime' ? b.uploadTime : b.updateTime

        return sortDirection.value === 'asc'
            ? compareValueA - compareValueB
            : compareValueB - compareValueA
    })
})


// 分页数据
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
const toggleSort = (field: 'uploadTime' | 'updateTime') => {
    if (sortBy.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortBy.value = field
        sortDirection.value = 'desc' // 默认新字段降序排列
    }
}


// 时间格式化
const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
}

// 操作处理
const handleAction = (item: Invoice, action: string) => {
    // console.log('处理操作:', action, item)
}

const handleBatch = (action: string) => {
    // console.log('批量操作:', action, selectedIds.value)
}
</script>