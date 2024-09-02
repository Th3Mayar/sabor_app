<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import { ref, watch } from "vue";
import { cn } from "@/lib/utils";

// Define props and emits
const props = defineProps<{
  name?: string;
  label?: string;
  modelValue?: number;
}>();

const emit = defineEmits(["update:modelValue"]);

// Create reference for internal value
const internalValue = ref(props.modelValue ?? 0);

// Watch for changes in the model value
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue ?? 0;
  }
);

// Emit the new value when it changes
const updateValue = (value: number) => {
  internalValue.value = value;
  emit("update:modelValue", value);
};
</script>

<template>
  <div>
    <Label
      :for="props.name"
      :class="cn('block font-semibold', { 'mb-2': props.label })"
    >
      {{ props.label }}
    </Label>
    <NumberField
      id="count_person"
      :value="internalValue"
      :min="0"
      @valueChange="updateValue"
    >
      <NumberFieldContent
        class="w-[280px] dark:bg-dark-background/50 rounded-[25px] dark:border dark:border-background/20 mt-2"
      >
        <NumberFieldDecrement @click="updateValue(internalValue - 1)" />
        <NumberFieldInput
          :value="internalValue"
          @input="updateValue($event.target.value)"
        />
        <NumberFieldIncrement @click="updateValue(internalValue + 1)" />
      </NumberFieldContent>
    </NumberField>
  </div>
</template>
