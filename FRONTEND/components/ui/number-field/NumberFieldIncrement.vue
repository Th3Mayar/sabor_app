<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'radix-vue'
import { NumberFieldIncrement, useForwardProps } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { Plus } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldIncrement data-slot="increment" v-bind="forwarded" :class="cn('bg-dark-background text-background absolute top-6 size-7 -translate-y-1/2 right-2 rounded-[25px] disabled:cursor-not-allowed disabled:opacity-20', props.class)">
    <slot>
      <Plus class="h-5 w-5 ml-1" />
    </slot>
  </NumberFieldIncrement>
</template>
