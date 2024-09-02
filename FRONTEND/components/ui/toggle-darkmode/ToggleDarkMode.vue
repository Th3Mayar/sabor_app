<template>
  <button
    @click="toggleDarkMode"
    class="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ease-in-out"
    :class="{
      'bg-gray-800 text-white': isDarkMode,
      'bg-gray-200 text-gray-800': !isDarkMode,
    }"
    aria-label="Toggle Dark Mode"
  >
    <Icon v-if="isDarkMode" name="Sun" size="20" />
    <Icon v-else name="Moon" size="20" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Icon from "@/components/atoms/IconByName.vue";

const isDarkMode = ref(false);

onMounted(() => {
  isDarkMode.value =
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  updateTheme();
});

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  updateTheme();
}

function updateTheme() {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}
</script>

<style scoped>
button {
  outline: none;
}

.dark-mode-icon {
  transition: transform 0.3s ease-in-out;
}

.dark-mode-icon:hover {
  transform: scale(1.1);
}
</style>
