<template>
  <div class="flex items-center justify-center gap-2">
    <InputComponent
      v-model="localEmail"
      placeholder="Ingrese su correo"
      class="flex-2 w-[100%]"
      name="email"
    />

    <span class="text-xl text-textVariant2">@</span>

    <Select v-model="selectedDomain">
      <SelectTrigger
        class="flex w-44 cursor-pointer appearance-none rounded-[25px] bg-background py-3 border-mainContent focus:shadow-lg px-4 shadow-md outline-none transition-shadow duration-300 placeholder-textVariant1 items-center mt-1"
      >
        <SelectValue :placeholder="selectedDomain" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea class="w-full rounded-md">
          <SelectGroup>
            <SelectItem
              v-for="domain in emailDomains"
              :key="domain"
              :value="domain"
              class="cursor-pointer select-none relative hover:bg-buttonPrimary hover:text-white h-max-content"
            >
              {{ domain }}
            </SelectItem>
          </SelectGroup>
        </ScrollArea>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import InputComponent from "@/components/atoms/InputField.vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Props y Emits para permitir el v-model
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const emailDomains = ref([
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "hotmail.com",
]);

const localEmail = ref("");
const selectedDomain = ref(emailDomains.value[0]);

// Computed para combinar el correo con el dominio
const fullEmail = computed(() => `${localEmail.value}@${selectedDomain.value}`);

// Watch para emitir el valor combinado cuando cambie
watch(fullEmail, (newValue) => {
  emit("update:modelValue", newValue);
});

// Iniciar con el valor del modelo si está presente
if (props.modelValue) {
  const [email, domain] = props.modelValue.split("@");
  if (email) localEmail.value = email;
  if (domain) selectedDomain.value = domain;
}
</script>