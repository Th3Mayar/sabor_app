<template>
  <div
    v-if="isAuthenticated"
    class="flex flex-col lg:flex-row h-screen overflow-hidden navbar"
  >
    <NavBar />
    <main
      :class="{ 'opacity-50 pointer-events-none': isMenuVisible }"
      class="bg-mainContent flex-1 mt-14 lg:mt-0 p-5 transition-opacity duration-300 ease-in-out"
    >
      <ScrollArea class="flex-1 h-full w-full">
        <div class="content-container">
          <slot class="content" />
        </div>
      </ScrollArea>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import NavBar from "@/components/template/Navbar.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";

const { isAuthenticated } = useAuth();
const router = useRouter();
const isMenuVisible = ref(false); 

onMounted(() => {
  if (!isAuthenticated.value) {
    console.log("User is not authenticated");
    router.push("/error");
  }
});
</script>

<style scoped>
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
