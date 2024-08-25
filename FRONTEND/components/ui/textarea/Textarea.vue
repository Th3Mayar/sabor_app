<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";
import ScrollAreaScrollbar from "@/components/ui/scroll-area/ScrollArea.vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  defaultValue?: string | number;
  modelValue?: string | number;
  name?: string;
  label?: string;
  placeholder?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <ScrollAreaScrollbar>
    <label
      :for="props.name"
      :class="
        cn('block font-semibold', {
          'mb-2': props.label,
        })
      "
    >
      {{ props.label }}
    </label>
    <textarea
      v-model="modelValue"
      :placeholder="props.placeholder"
      :class="
        cn(
          'rounded-[25px] min-h-20 w-full bg-background py-3 focus:shadow-lg px-4 shadow-md border-mainContent outline-none transition-shadow duration-300 placeholder-textVariant1',
          props.class
        )
      "
    />
  </ScrollAreaScrollbar>
</template>
