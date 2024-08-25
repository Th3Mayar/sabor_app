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

// Definir props y emitir eventos
const props = defineProps<{
  name?: string;
  label?: string;
  modelValue?: number;
}>();

const emit = defineEmits(['update:modelValue']);

// Crear una referencia interna para manejar el valor
const internalValue = ref(props.modelValue ?? 0);

// Sincronizar la referencia interna con el prop modelValue
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue ?? 0;
});

// Emitir el evento cuando el valor cambia
const updateValue = (value: number) => {
  internalValue.value = value;
  emit('update:modelValue', value);
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
      <NumberFieldContent class="w-[280px]">
        <NumberFieldDecrement @click="updateValue(internalValue - 1)" />
        <NumberFieldInput :value="internalValue" @input="updateValue($event.target.value)" />
        <NumberFieldIncrement @click="updateValue(internalValue + 1)" />
      </NumberFieldContent>
    </NumberField>
  </div>
</template>
