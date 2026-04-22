<template>
<div>
            <Sheet>
            <SheetTrigger as-child>
                <Button variant="outline" size="icon" class="sm:hidden">
                    <Icon name="mdi:chevron-double-right" class="w-4 h-4 text-white" />
                </Button>
            </SheetTrigger> 
            <SheetContent side="left" class="p-0 w-2/3 z-50 bg-background">
                <div class="pt-14 flex flex-col gap-y-2">
                    <div class="flex-1 overflow-hidden"> 
                        <ServiceSidebar></ServiceSidebar>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
</div>  
</template>