import { ref } from "vue";

const isMenuVisible = ref(false);

export function useMenuVisibility() {
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
    const iconMenu = document.querySelector(".icon-menu") as HTMLElement;
    if (!isMenuVisible.value) {
      iconMenu.style.color = "black";
    } else {
      iconMenu.style.color = "white";
    }
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