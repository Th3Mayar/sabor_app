<template>
  <SelectComponent
    :name="name"
    :label="label"
    :value="model"
    :placeholder="placeholder"
  >
    <OptionComponent disabled value="">
      {{ placeholder }}
    </OptionComponent>
    <OptionComponent
      v-for="date in availableDates"
      :key="date.value"
      :value="date.value"
    >
      {{ date.text }}
    </OptionComponent>
  </SelectComponent>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import SelectComponent from "@/components/atoms/SelectComponent.vue";
import OptionComponent from "@/components/atoms/OptionComponent.vue";

interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  daysToShow?: number;
}

const props = defineProps<DatePickerProps>();
const emit = defineEmits<{ (e: "input", value: string): void }>();

const model = computed({
  get() {
    return props.value;
  },
  set(value: string) {
    emit("input", value);
  },
});

// Generate an array of dates to show in the select
const availableDates = computed(() => {
  const dates = [];
  const daysToShow = props.daysToShow || 365; // View 1 year by default

  for (let i = 0; i < daysToShow; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i); // Increment the date by i days

    const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const dateText = date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    dates.push({ value: formattedDate, text: dateText });
  }

  return dates;
});
</script>
