// darkModeStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDarkModeStore = defineStore("darkMode", () => {
  const isDark = ref(false);

  const updateDarkMode = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    updateDarkMode();
  };

  const initializeDarkMode = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      isDark.value = false;
      document.documentElement.classList.remove("dark");
    }
  };

  return {
    isDark,
    toggleDarkMode,
    initializeDarkMode,
  };
});
