<template>
  <div
    :class="[
      'p-8',
      'bg-background dark:bg-dark-background',
      'text-textPrimary dark:text-dark-textPrimary',
    ]"
  >
    <h1 class="text-4xl font-bold mb-6">Personaliza tu tema</h1>

    <div class="mb-4">
      <label for="colorPicker" class="block text-xl mb-2">
        Selecciona un color:
      </label>
      <input
        id="colorPicker"
        type="color"
        v-model="themeColor"
        @input="updateThemeColors"
        class="border-2 border-gray-300 dark:border-gray-600 rounded"
      />
    </div>

    <button
      @click="toggleDarkMode"
      class="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded"
    >
      <Icon :name="isDark ? 'Sun' : 'Moon'" :size="24" class="text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import tinycolor from "tinycolor2";
import { useDarkMode } from "@/composables/useDarkMode";
import Icon from "@/components/atoms/IconByName.vue";

// Obtener si el modo oscuro está activado y la función para alternarlo
const { isDark, toggleDarkMode } = useDarkMode();

// Definir el color del tema con un valor inicial
const themeColor = ref("#FFFF"); // Color inicial (Indigo)

// Función para calcular y actualizar los colores derivados
const updateThemeColors = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const baseColor = tinycolor(target.value);

  // Calcula colores derivados usando tinycolor
  const backgroundColor = baseColor.lighten(40).toString(); // Color de fondo claro
  const textColor = baseColor.isLight()
    ? baseColor.darken(60).toString()
    : baseColor.lighten(60).toString(); // Color de texto
  const buttonPrimary = baseColor.toString(); // Botón principal igual al color base
  const buttonSecondary = baseColor.triad()[1].toString(); // Botón secundario, usando triadic color

  // Actualiza las variables CSS con los colores calculados
  document.documentElement.style.setProperty("--theme-color", target.value);
  document.documentElement.style.setProperty("--background", backgroundColor);
  document.documentElement.style.setProperty("--text-primary", textColor);
  document.documentElement.style.setProperty("--button-primary", buttonPrimary);
  document.documentElement.style.setProperty(
    "--button-secondary",
    buttonSecondary
  );

  themeColor.value = target.value;
};

onMounted(() => {
  updateThemeColors({
    target: { value: themeColor.value },
  } as unknown as Event);
});

definePageMeta({
  middleware: "auth",
});
</script>
