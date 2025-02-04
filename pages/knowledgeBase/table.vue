<template>
    <div class="rounded-md border mt-8">
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
                <NuxtLink to="/knowledgeBase/id" v-for="invoice in invoices" :key="invoice.invoice" class="contents">
                    <TableRow class="cursor-pointer ">
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
                    <Separator class="w-0" />
                </NuxtLink>
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
    },
    {
        invoice: 'INV002',
        paymentStatus: 'Pending',
        totalAmount: '$150.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV003',
        paymentStatus: 'Unpaid',
        totalAmount: '$350.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV004',
        paymentStatus: 'Paid',
        totalAmount: '$450.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV005',
        paymentStatus: 'Paid',
        totalAmount: '$550.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV006',
        paymentStatus: 'Pending',
        totalAmount: '$200.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
]
</script>
