<template>
  <div class="flex flex-col">
    <label :for="name" class="mb-2 font-medium text-textPrimary">
      {{ label }}
    </label>
    <Field
      :type="type"
      :name="name"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="model"
      :class="[
        'input-field',
        'px-4',
        'py-3',
        'rounded-[25px]',
        'bg-background',
        'shadow-md',
        'border',
        'border-mainContent',
        'outline-none',
        'transition-shadow',
        'duration-300',
        'placeholder-textVariant1',
        'focus:shadow-lg',
        'dark:bg-dark-background/60',
        'dark:border',
        'dark:border-background/20',
        'dark:placeholder-dark-textVariant1',
      ]"
    />
    <ErrorMessage :name="name" class="text-red-600 mt-1" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  value?: string | number;
}

const props = defineProps<InputProps>();
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.value;
  },
  set(value: string | number) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped>
.input-field {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.input-field:focus {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
