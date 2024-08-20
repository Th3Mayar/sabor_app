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
      <label for="colorPicker" class="block text-xl mb-2"
        >Selecciona un color:</label
      >
      <input
        id="colorPicker"
        type="color"
        v-model="themeColor"
        @input="updateThemeColor"
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
import { useDarkMode } from "@/composables/useDarkMode";
import Icon from "@/components/atoms/IconByName.vue";

const { isDark, toggleDarkMode } = useDarkMode();
</script>