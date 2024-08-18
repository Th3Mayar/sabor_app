<template>
  <div
    :class="[
      'bg-background',
      'dark:bg-dark-background',
      'text-textPrimary',
      'dark:text-dark-textPrimary',
    ]"
    class="min-h-screen p-8"
  >
    <h1 class="text-4xl font-bold mb-6">Personaliza tu tema</h1>

    <div class="mb-4">
      <label for="colorPicker" class="block text-xl mb-2"
        >Selecciona un color:</label
      >
      <input
        id="colorPicker"
        type="color"
        v-model="themeColor"
        @input="updateThemeColor"
        class="border-2 border-gray-300 rounded"
      />
    </div>

    <button
      @click="toggleDarkMode"
      class="mt-4 p-2 bg-buttonPrimary dark:bg-dark-buttonPrimary text-white rounded"
    >
      Alternar Dark Mode
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const nuxtApp = useNuxtApp();

const themeColor = ref<string>("#282866");

const updateThemeColor = () => {
  document.documentElement.style.setProperty("--theme-color", themeColor.value);
  localStorage.setItem("themeColor", themeColor.value);
};

const toggleDarkMode = () => {
  nuxtApp.$darkMode.toggle();
};

onMounted(() => {
  const savedColor = localStorage.getItem("themeColor");
  if (savedColor) {
    themeColor.value = savedColor;
    updateThemeColor();
  }
});

function getContrastingColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? "#000000" : "#ffffff";
}
</script>

<style>
:root {
  --theme-color: #282866;
}

.bg-theme {
  background-color: var(--theme-color);
}

.text-theme {
  color: var(--theme-color);
}

.dark {
  background-color: #1a202c;
  color: #e2e8f0;
}
</style>
