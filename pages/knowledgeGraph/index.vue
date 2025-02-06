<template>
  <div class="relative flex flex-1">
    <label class="absolute top-0 right-0 z-10">
      <Select v-model="knowledge">
        <SelectTrigger id="framework">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="https://halobase.github.io/g">
            脆李
          </SelectItem>
          <SelectItem value="https://jimoins.github.io/orange">
            柑橘
          </SelectItem>
          <SelectItem value="https://jimoins.github.io/strawberry">
            草莓
          </SelectItem>
          <SelectItem value="https://jimoins.github.io/rice">
            水稻
          </SelectItem>
        </SelectContent>
      </Select>
    </label>
    <iframe class="w-full h-full" :src=knowledge title="g" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let knowledge = ref("https://halobase.github.io/g");
definePageMeta({
  layout: 'router'
})
</script>
