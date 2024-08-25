<script setup lang="ts">
import type { NumberFieldDecrementProps } from 'radix-vue'
import { NumberFieldDecrement, useForwardProps } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { Minus } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldDecrement data-slot="decrement" v-bind="forwarded" :class="cn('bg-dark-background text-background size-7 rounded-[25px] absolute top-6 -translate-y-1/2 left-2 disabled:cursor-not-allowed disabled:opacity-20', props.class)">
    <slot>
      <Minus class="h-5 w-5 ml-1" />
    </slot>
  </NumberFieldDecrement>
</template>