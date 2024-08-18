<template>
  <div class="flex flex-col w-full">
    <label :for="name" class="mb-2 font-medium text-textPrimary">{{
      label
    }}</label>
    <textarea
      :name="name"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="model"
      class="resize-none px-4 py-3 rounded-[25px] bg-background shadow-md border border-mainContent outline-none transition-shadow duration-300 text-base text-textPrimary placeholder-textVariant1 focus:shadow-lg"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface TextareaProps {
  name: string;
  label?: string;
  value?: string;
}

const props = defineProps<TextareaProps>();

const model = computed({
  get() {
    return props.value;
  },
  set(value: string) {
    emit("input", value);
  },
});
</script>
