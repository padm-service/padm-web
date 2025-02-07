<template>
    <div>
        <div class="flex items-center justify-between">
            <span class="text-2xl font-bold my-4">响应</span>
            <div class="flex gap-2">
                <Badge variant="outline" class="rounded-md px-2 py-1 text-xs border-green-500">
                    200
                </Badge>
            </div>
        </div>
        <p class="dark:text-gray-400 text-gray-500 text-md">The Message object.</p>
        <div>
            <div class="flex items-center justify-between">
                <span class="text-2xl font-bold my-4">Body</span>
                <Select>
                    <SelectTrigger class="max-w-40 h-8 text-center">
                        <SelectValue placeholder="application/json" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="apple" class="!h-6">
                                Apple
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <DocField></DocField>
        </div>
    </div>
</template>