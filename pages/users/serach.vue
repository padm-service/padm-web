<template>
    <div class="flex gap-2 sm:flex-row flex-col">
        <div class="relative  max-w-72 items-center">
            <Input id="search" type="text" placeholder="请输入用户名或ID" class="pl-10 h-9" />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <Icon name="si:search-duotone" class="w-7 h-7"></Icon>
            </span>
        </div>
        <div class="flex gap-2">
            <Button variant="outline" class="max-w-36">
                <Icon name="material-symbols:lock-open-outline" class="w-5 h-5"></Icon>
                批量启用
            </Button>
            <Button variant="outline" class="max-w-36">
                <Icon name="material-symbols:lock-outline-sharp" class="w-5 h-5"></Icon>
                批量禁用
            </Button>
        </div>
    </div>
</template>