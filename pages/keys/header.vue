<template>
    <div class="flex items-center">
        <ContainerBack></ContainerBack>
        <header class="mx-auto ">
            <span class="font-bold pb-4  text-md sm:text-xl">API Key</span>
        </header>
        <Dialog>
            <DialogTrigger as-child>
                <Button variant="outline" class=" bg-blue-500 text-white hover:bg-blue-700 hover:text-white">
                    + 创建API Key
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:w-full">
                <DialogHeader>
                    <DialogTitle>新建API Key</DialogTitle>
                    <DialogDescription>
                        API key名称，用来区分API key.
                    </DialogDescription>
                </DialogHeader>
                <Input id="name" placeholder="请输入API key名称" />
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