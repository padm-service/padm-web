<template>
    <div class="flex items-center">
        <ContainerBack></ContainerBack>
        <header class="mx-auto ">
            <span class="font-bold pb-4  text-md sm:text-xl"> 知识库</span>
        </header>
        <Dialog>
            <DialogTrigger as-child>
                <Button variant="outline" class=" bg-blue-500 text-white hover:bg-blue-700 hover:text-white">
                    + 创建知识库
                </Button>
            </DialogTrigger>
            <DialogContent class="w-96 sm:w-full">
                <DialogHeader>
                    <DialogTitle>新建知识库</DialogTitle>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="flex flex-col gap-4">
                        <Label for="name" class="text-left">
                            知识库名称 <span class="text-red-500">*</span>
                        </Label>
                        <Input id="name" class="" />
                    </div>
                    <div class="flex flex-col gap-4">
                        <Label for="username" class="text-left">
                            知识库描述 <span class="text-red-500">*</span>
                        </Label>
                        <Textarea placeholder="Type your message here." class="resize-none h-24" />
                        <!-- <Input id="username" class="h-24" /> -->
                    </div>
                </div>
                <DialogFooter class="flex flex-row justify-end gap-2">
                    <Button type="submit" variant="outline">
                        <DialogClose aria-label="Close">
                            取消
                        </DialogClose>
                    </Button>
                    <Button type="submit" class="bg-blue-500 text-white hover:bg-blue-700 hover:text-white">
                        创建
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>