import { ref, onMounted } from 'vue';

export function useDarkMode() {
  const isDark = ref(false);

  const updateDarkMode = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    updateDarkMode();
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'enabled') {
      isDark.value = true;
      document.documentElement.classList.add('dark');
    }
  });

  return {
    isDark,
    toggleDarkMode,
  };
}
