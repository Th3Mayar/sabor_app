<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { useVModel } from "@vueuse/core";
import IconByName from "../atoms/IconByName.vue";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const props = defineProps<{
  modelValue?: DateValue | null;
  name?: string;
  label?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const currentDate = today(getLocalTimeZone());

const value = ref<DateValue | DateValue[] | null>(
  props.modelValue ? props.modelValue : null
);

if (!value.value) {
  value.value = currentDate;
}

watch(value, (newValue) => {
  emit("update:modelValue", newValue);
});

const formattedValue = computed(() => {
  return value.value
    ? df.format((value.value as DateValue).toDate(getLocalTimeZone()))
    : "Pick a date";
});
</script>

<template>
  <Popover>
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
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'rounded-[25px] bg-background w-[280px] py-3 justify-start text-left font-normal gap-2 border-mainContent focus:shadow-lg px-4 shadow-md outline-none transition-shadow duration-300 placeholder-textVariant1 h-12 dark:bg-dark-background/60 dark:border-background/20 dark:placeholder-dark-textVariant1',
            !value && 'text-muted-foreground'
          )
        "
      >
        <IconByName name="CalendarDays" size="20" color="dark" />
        {{ formattedValue }}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="w-auto p-0 bg-background text-dark-background dark:bg-dark-skeleton dark:text-background rounded-[28px]"
    >
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
