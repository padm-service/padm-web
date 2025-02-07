<template>
    <span class="text-2xl font-bold mt-4">请求</span>
    <span class="capitalize ">Path Parameters</span>
    <div class="flex flex-col gap-6">
        <DocField></DocField>
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