<template>
    <div>
        <div class="flex items-center gap-2 sm:gap-4">
            <Input type="text" placeholder="请输入关键词" class="max-w-40 sm:max-w-56 dark:bg-[#313131] bg-[#e8e8e8]" />
            <Label for="fileType" class="hidden"></Label>
            <Select :model-value=fileType>
                <SelectTrigger id="framework" class="dark:bg-[#313131] bg-[#e8e8e8] w-30">
                    <SelectValue placeholder="请选择知识库" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="all">
                        全部文件
                    </SelectItem>
                    <SelectItem value="pdf">
                        PDF
                    </SelectItem>
                    <SelectItem value="word">
                        DOC\DOCX
                    </SelectItem>
                    <SelectItem value="ppt">
                        PPT\PPTX
                    </SelectItem>
                    <SelectItem value="txt">
                        TXT\MD
                    </SelectItem>
                    <SelectItem value="excel">
                        XLSX\XLS\CSV
                    </SelectItem>
                </SelectContent>
            </Select>
            <DropdownMenu>
                <DropdownMenuTrigger as-child class="dark:bg-[#313131] bg-[#e8e8e8]">
                    <Button variant="outline">
                        批量管理
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="min-w-0">
                    <DropdownMenuGroup>
                        <DropdownMenuItem class="flex justify-center">
                            <Icon name="fluent-mdl2:date-time-2" class=" bg-blue-500"></Icon>
                            时效
                        </DropdownMenuItem>
                        <DropdownMenuItem class="flex justify-center">
                            <Icon name="ci:download" class=" bg-blue-500"></Icon>
                            下载
                        </DropdownMenuItem>
                        <DropdownMenuItem class="flex justify-center">
                            <Icon name="fluent:delete-32-filled" class="bg-red-600 dark:bg-red-800"></Icon>
                            删除
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div class="rounded-md border mt-8 ">
            <Table class="text-md">
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-5 flex items-center">
                            <Checkbox></Checkbox>
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">
                            文件名
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">文件状态</TableHead>
                        <TableHead class="text-sm sm:text-base">有效状态</TableHead>
                        <TableHead class="text-sm sm:text-base">
                            上传时间
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">
                            更新时间
                        </TableHead>
                        <TableHead class="text-sm sm:text-base">
                            操作
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="invoice in invoices" :key="invoice.invoice" class="items-center">
                        <TableCell class="w-5">
                            <Checkbox></Checkbox>
                        </TableCell>
                        <TableCell>
                            <ContainerKnowledgeIcon :invoice=invoice></ContainerKnowledgeIcon>
                            <!-- <div class="">
                                <Icons :type="invoice.name.split('.').pop()" class="sm:w-7 sm:h-7 w-5 h-5"></Icons>{{
                                    invoice.name }}
                            </div> -->
                        </TableCell>
                        <TableCell>{{ invoice.paymentStatus }}</TableCell>
                        <TableCell>{{ invoice.paymentMethod }}</TableCell>
                        <TableCell>
                            {{ invoice.totalAmount }}
                        </TableCell>
                        <TableCell>
                            2024-11-20 19:56:19
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button size="icon" variant="ghost">
                                        <Icon name="fa-solid:ellipsis-h" class="bg-blue-500"></Icon>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="min-w-0">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem class="flex justify-center">
                                            <Icon name="fluent-mdl2:date-time-2" class=" bg-blue-500"></Icon>
                                            时效
                                        </DropdownMenuItem>
                                        <DropdownMenuItem class="flex justify-center ">
                                            <Icon name="ci:download" class=" bg-blue-500"></Icon>
                                            下载
                                        </DropdownMenuItem>
                                        <DropdownMenuItem class="flex justify-center">
                                            <Icon name="fluent:delete-32-filled" class="bg-red-600 dark:bg-red-800">
                                            </Icon>
                                            删除
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2"
            class="flex justify-center mt-4 ">
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst />
                <PaginationPrev />
                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                        <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
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
const fileType = ref("all");
const batchManage = ref("");
const invoices = [
    {
        id: "12464adadad",
        name: 'test.pdf',
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
    {
        id: "12464adadaddada",
        name: 'test.pdf',
        invoice: 'INV002',
        paymentStatus: 'Pending',
        totalAmount: '$150.00',
        paymentMethod: 'PayPal',
    },
    {
        id: "12464addadagsfgadad",
        name: 'test.pdf',
        invoice: 'INV003',
        paymentStatus: 'Unpaid',
        totalAmount: '$350.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        id: "12464adahdrldad",
        name: 'test.ppt',
        invoice: 'INV004',
        paymentStatus: 'Paid',
        totalAmount: '$450.00',
        paymentMethod: 'Credit Card',
    },
    {
        id: "12464adadhtrhtad",
        name: 'test.excel',
        invoice: 'INV005',
        paymentStatus: 'Paid',
        totalAmount: '$550.00',
        paymentMethod: 'PayPal',
    },
    {
        id: "12464aduykyukadad",
        name: 'test.markdown',
        invoice: 'INV006',
        paymentStatus: 'Pending',
        totalAmount: '$200.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        id: "12464ad,.madad",
        name: 'test.txt',
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
]
</script>
