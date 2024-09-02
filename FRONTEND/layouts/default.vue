<template>
  <div
    :class="{ 'overlay-active': isMenuVisible }"
    class="flex flex-col lg:flex-row h-screen overflow-hidden navbar"
    v-if="isAuthenticated"
  >
    <NavBar class="dark:bg-dark-mainContent/50" />
    <main
      class="relative bg-mainContent dark:bg-dark-mainContent/50 flex-1 mt-14 lg:mt-0 p-5 transition-opacity duration-300 ease-in-out"
    >
      <!-- Overlay -->
      <div
        class="overlay absolute inset-0 pointer-events-none transition-opacity duration-300"
      ></div>

      <ScrollArea class="flex-1 h-full w-full relative z-20">
        <div class="content-container">
          <slot class="content" />
        </div>
      </ScrollArea>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useMenuVisibility } from "@/composables/useMenuVisibility";
import NavBar from "@/components/template/Navbar.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";

const { isAuthenticated } = useAuth();
const { isMenuVisible } = useMenuVisibility();
const router = useRouter();

onMounted(() => {
  if (!isAuthenticated.value) {
    console.log("User is not authenticated");
    router.push("/error");
  }
});
</script>

<style scoped>
.overlay {
  z-index: 999;
  transition: background-color 0.3s ease-in-out;
}

.overlay-active main {
  opacity: 0.8;
  pointer-events: none;
}

.overlay-active .overlay {
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

html,
body {
  overflow: hidden;
  height: 100%;
  margin: 0;
}

main {
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content-container {
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
}
</style>
