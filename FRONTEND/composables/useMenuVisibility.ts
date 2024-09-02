import { ref } from "vue";

const isMenuVisible = ref(false);

export function useMenuVisibility() {
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };

  const openMenu = () => {
    isMenuVisible.value = true;
  };

  const closeMenu = () => {
    isMenuVisible.value = false;
  };

  return {
    isMenuVisible,
    toggleMenu,
    openMenu,
    closeMenu,
  };
}
