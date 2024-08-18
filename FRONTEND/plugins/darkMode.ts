export default defineNuxtPlugin(() => {
  return {
    provide: {
      darkMode: {
        toggle() {
          document.documentElement.classList.toggle("dark");
        },
        enable() {
          document.documentElement.classList.add("dark");
        },
        disable() {
          document.documentElement.classList.remove("dark");
        },
      },
    },
  };
});
