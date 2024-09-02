<template>
  <div class="flex flex-col">
    <label :for="props.name" class="block font-semibold mb-[6px]">
      {{ props.label }}
    </label>
    <div class="relative">
      <div
        @click="toggleDropdown"
        class="cursor-pointer appearance-none rounded-[25px] bg-background py-3 border-mainContent focus:shadow-lg px-4 shadow-md outline-none transition-shadow duration-300 placeholder-textVariant1 flex items-center dark:bg-dark-background/60 dark:border dark:border-background/20"
      >
        <span>{{ selectedTime }}</span>
        <div class="ml-4">
          <Icon
            class="h-5 text-dark-background dark:text-background"
            :name="isOpen ? 'ChevronDown' : 'ChevronUp'"
          />
        </div>
      </div>

      <div
        v-if="isOpen"
        class="absolute z-10 mt-1 w-full bg-background rounded-[28px] shadow-lg dark:bg-dark-skeleton overflow-hidden"
      >
        <ScrollArea class="h-72 w-full rounded-md p-1">
          <div class="p-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar hora..."
              class="mb-3 w-full px-3 py-2 border-b border-gray-300 focus:outline-none text-background dark:text-background dark:bg-dark-background/30 rounded-[28px]"
            />

            <!-- List by option filter -->
            <div v-for="hour in filteredOptions" :key="hour">
              <div
                @click="selectTime(hour)"
                class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-buttonPrimary hover:text-background text-center"
              >
                {{ hour }}
              </div>
              <Separator class="my-2" />
            </div>

            <div
              v-if="filteredOptions.length === 0"
              class="py-2 px-3 text-gray-500"
            >
              No se encontraron resultados
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/atoms/IconByName.vue";

const props = defineProps<{
  modelValue?: string | null;
  name?: string;
  label?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const timeOptions = ref([
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
]);

const selectedTime = ref(props.modelValue || timeOptions.value[0]);
const isOpen = ref(false);
const searchQuery = ref("");

watch(selectedTime, (newValue) => {
  emit("update:modelValue", newValue);
});

// Función para alternar el estado del dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Función para seleccionar una hora
const selectTime = (hour: string) => {
  selectedTime.value = hour;
  isOpen.value = false;
  searchQuery.value = ""; // Resetea el buscador al seleccionar
};

// Filtrar opciones basadas en la consulta de búsqueda
const filteredOptions = computed(() => {
  return timeOptions.value.filter((hour) =>
    hour.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
