import { ref, onMounted, computed } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(false);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle("dark", isDarkMode.value);
    localStorage.setItem("darkMode", isDarkMode.value ? "true" : "false");
  };

  const enableDarkMode = () => {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  };

  const disableDarkMode = () => {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  };

  onMounted(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  return {
    isDarkMode: computed(() => isDarkMode.value),
    toggleDarkMode,
    enableDarkMode,
    disableDarkMode,
  };
}
