<template>
  <div class="flex flex-col w-full">
    <label :for="name" class="mb-2 font-medium text-textPrimary">{{
      label
    }}</label>
    <select
      :name="name"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="model"
      class="relative px-4 py-3 pr-10 rounded-[25px] bg-background shadow-md border border-mainContent outline-none transition-shadow duration-300 text-base text-textPrimary appearance-none"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface SelectProps {
  name: string;
  label?: string;
  value?: string;
}

const props = defineProps<SelectProps>();

const model = computed({
  get() {
    return props.value;
  },
  set(value: string) {
    emit("input", value);
  },
});
</script>

<style scoped>
.select-field::after {
  content: "▼";
  font-size: 12px;
  color: #333;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.select-field:focus {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #aaa;
}
</style>
