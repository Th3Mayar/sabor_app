<script setup lang="ts">
import { NumberFieldInput } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <NumberFieldInput
    data-slot="input"
    :class="cn('rounded-[25px] h-12 w-full bg-background py-3 text-sm text-center focus:shadow-lg px-4 shadow-md border-mainContent outline-none transition-shadow duration-300 placeholder-textVariant1', props.class)"
  />
</template>
