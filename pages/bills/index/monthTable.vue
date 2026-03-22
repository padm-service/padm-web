<template>
    <div class="rounded-md border mt-2">
        <Table class=" text-md ">
            <TableHeader>
                <TableRow>
                    <TableHead>
                        账单id
                    </TableHead>
                    <TableHead>用户id</TableHead>
                    <TableHead>账期</TableHead>
                    <TableHead>模型名称</TableHead>
                    <TableHead>
                        key
                    </TableHead>
                    <TableHead>
                        消费金额
                    </TableHead>
                    <TableHead>
                        余额
                    </TableHead>
                    <!-- <TableHead>
                        操作
                    </TableHead> -->
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-if="billList.length <=0"><p class="text-center">Empty</p></TableRow>
                <TableRow class="cursor-pointer " v-else v-for="bill in billList" :key="bill.id">
                    <TableCell class="font-bold">
                        📚{{ bill.id }}
                    </TableCell>
                    <TableCell>{{ bill.userId }}</TableCell>
                    <TableCell>{{ bill.updated_at }}</TableCell>
                    <TableCell>{{ bill.modelName }}</TableCell>
                    <TableCell>{{ bill.keyId }}</TableCell>
                    <TableCell>{{ bill.consumptionAmount }}</TableCell>
                    <TableCell>
                        {{ bill.balance }}
                    </TableCell>
                    <!-- <TableCell>
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
                    </TableCell> -->
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script lang="ts" setup>
// const invoices = [
//     {
//         invoice: 'INV001',
//         paymentStatus: 'Paid',
//         totalAmount: '$250.00',
//         paymentMethod: 'Credit Card',
//     }
// ]
import { onMounted } from 'vue';

const { billList, getBill } = usebills();
const { getUser } = useUsers();
const authStore = userAuthStore();
const { user } = storeToRefs(authStore);
console.log('当前的用户是',user)
console.log('当前用户的id',user.value?.id)
onMounted(() => {
  const userId=user.value?.id as string;
  getBill(userId);
  console.log(billList);
});
</script>
