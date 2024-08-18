<template>
  <option :value="value" :disabled="disabled" :selected="selected">
    <slot></slot>
  </option>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface OptionProps {
  value: string | number | null;
  disabled?: boolean;
  selected?: boolean;
}

const props = defineProps<OptionProps>();
</script>