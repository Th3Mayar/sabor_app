<template>
  <div class="flex items-center gap-2">
    <Select v-model="selectedFilter">
      <SelectTrigger
        class="flex w-44 cursor-pointer appearance-none rounded-[25px] bg-background py-3 border-mainContent focus:shadow-lg px-4 shadow-md outline-none transition-shadow duration-300 placeholder-textVariant1 items-center"
      >
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea class="w-full rounded-md">
          <SelectGroup>
            <SelectItem
              v-for="option in filterOptions"
              :key="option.value"
              :value="option.value"
              class="cursor-pointer select-none relative hover:bg-buttonPrimary hover:text-white h-max-content"
            >
              {{ option.label }}
            </SelectItem>
          </SelectGroup>
        </ScrollArea>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area";

// Props and emits to allow v-model usage
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Seleccione filtro",
  },
});

const emit = defineEmits(["update:modelValue"]);

const filterOptions = ref([
  { value: "contains", label: "Contiene" },
  { value: "equals", label: "Igual" },
  { value: "startsWith", label: "Comienza con" },
  { value: "endsWith", label: "Termina con" },
]);

const selectedFilter = ref(props.modelValue);

// Watch to emit the value when it changes
watch(selectedFilter, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
