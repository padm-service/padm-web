<template>
    <div class="rounded-md border mt-8">
        <Table class=" text-md ">
            <TableHeader>
                <TableRow>
                    <TableHead>
                    </TableHead>
                    <TableHead>
                        API key名称
                    </TableHead>
                    <TableHead>API key</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>
                        上次使用时间
                    </TableHead>
                    <TableHead>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="invoice in invoices" :key="invoice.invoice">
                    <TableCell class="font-bold">
                        🗝️
                    </TableCell>
                    <TableCell class="font-bold">
                        {{ invoice.invoice }}
                    </TableCell>
                    <TableCell>{{ invoice.paymentStatus }}</TableCell>
                    <TableCell>{{ invoice.paymentMethod }}</TableCell>
                    <TableCell>
                        {{ invoice.totalAmount }}
                    </TableCell>
                    <TableCell>
                        <AlertDialog>
                            <AlertDialogTrigger as-child>
                                <Button variant="ghost" class="dark:hover:bg-[#3d0505] hover:bg-[#d8cfca]"
                                    size="icon">撤销</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>提示</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        确定撤销sk-vo65******ed65吗？该操作不可逆转。
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>取消</AlertDialogCancel>
                                    <AlertDialogAction
                                        class="bg-[#ca4d4d] hover:bg-[#c93636] dark:bg-[#961f1f] dark:hover:bg-[#ae3737] text-white">
                                        我确定
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
