<template>
    <div class="rounded-md border mt-2">
        <Table class=" text-md ">
            <TableHeader>
                <TableRow>
                    <TableHead>
                        知识库名称
                    </TableHead>
                    <TableHead>使用空间</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>
                        更新时间
                    </TableHead>
                    <TableHead>
                        操作
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow class="cursor-pointer " v-for="invoice in invoices" :key="invoice.invoice">
                    <TableCell class="font-bold">
                        📚{{ invoice.invoice }}
                    </TableCell>
                    <TableCell>{{ invoice.paymentStatus }}</TableCell>
                    <TableCell>{{ invoice.paymentMethod }}</TableCell>
                    <TableCell>
                        {{ invoice.totalAmount }}
                    </TableCell>
                    <TableCell>
                        <HoverCard>
                            <HoverCardTrigger as-child>
                                <Button @click.stop.prevent size="icon" variant="ghost">
                                    <Icon name="fa-solid:ellipsis-h" class="bg-blue-500"></Icon>
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent class="border flex flex-col w-fit">
                                <Button variant="ghost">
                                    <Icon name="line-md:edit-full-twotone" class="bg-blue-500"></Icon>编辑
                                </Button>
                                <Button variant="ghost">
                                    <Icon name="fluent:delete-32-filled" class="bg-red-600 dark:bg-red-800"></Icon>
                                    删除
                                </Button>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script lang="ts" setup>
const invoices = [
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    }
]
</script>
