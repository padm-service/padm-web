<template>
    <div class="rounded-md border mt-2">
        <Table class=" text-md ">
            <TableHeader>
                <TableRow>
                    <TableHead class="w-5 flex items-center">
                        <Checkbox></Checkbox>
                    </TableHead>
                    <TableHead>
                        头像
                    </TableHead>
                    <TableHead>
                        用户名
                    </TableHead>
                    <TableHead>用户ID</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>
                        上次使用
                    </TableHead>
                    <TableHead>
                        用户状态
                    </TableHead>
                    <TableHead>
                        操作
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="invoice in invoices" :key="invoice.invoice">
                    <TableCell class="w-5">
                        <Checkbox></Checkbox>
                    </TableCell>
                    <TableCell>😀</TableCell>
                    <TableCell class="font-bold">
                        {{ invoice.invoice }}
                    </TableCell>
                    <TableCell>{{ invoice.paymentStatus }}</TableCell>
                    <TableCell>{{ invoice.paymentMethod }}</TableCell>
                    <TableCell>
                        {{ invoice.totalAmount }}
                    </TableCell>
                    <TableCell>
                        <div class="flex items-center gap-2">
                            <Label for="airplane-mode">启用</Label>
                            <Switch id="airplane-mode" />
                        </div>
                    </TableCell>
                    <TableCell>
                        <Popover>
                            <PopoverTrigger>
                                <Button size="icon" variant="ghost">
                                    <Icon name="fa-solid:ellipsis-h" class="bg-blue-500"></Icon>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="border flex flex-col w-fit">
                                <Sheet>
                                    <SheetTrigger as-child>
                                        <Button variant="ghost" class="text-green-500 hover:text-green-500">
                                            <Icon name="carbon:user-role" class="dark:bg-green-500 "></Icon>权限
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Marry的权限审批</SheetTitle>
                                            <SheetDescription>
                                                勾选模型即可授予权限，取消勾选收回权限。
                                            </SheetDescription>
                                        </SheetHeader>
                                        <Serach class="my-8"></Serach>
                                        <ScrollArea class="rounded-md border  mt-2">
                                            <div class="p-4  max-h-96 ">
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
                                        <SheetFooter>
                                            <SheetClose as-child>
                                                <Button type="submit" class="mt-4">
                                                    提交
                                                </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                                <AlertDialog>
                                    <AlertDialogTrigger as-child>
                                        <Button variant="ghost" class="text-red-600 hover:text-red-600">
                                            <Icon name="fluent:delete-32-filled" class="bg-red-600"></Icon>
                                            注销
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle class="text-red-500">你确定要注销该用户吗？</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                此操作不可逆转，被注销后该用户所有的信息都会失去。
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>取消</AlertDialogCancel>
                                            <AlertDialogAction
                                                class="bg-[#ca4d4d] hover:bg-[#c93636] dark:bg-[#961f1f] dark:hover:bg-[#ae3737] text-white">
                                                确定</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script lang="ts" setup>
import Serach from './serach.vue';
const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
)
const invoices = [
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    }
]
</script>
