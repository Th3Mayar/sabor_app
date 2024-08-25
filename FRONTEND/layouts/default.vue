<template>
  <div
    v-if="isAuthenticated"
    class="flex flex-col lg:flex-row h-[98vh] overflow-hidden navbar"
  >
    <NavBar />
    <main class="bg-mainContent flex-1 lg:h-[89vh] mt-[54px] p-5">
      <ScrollArea class="flex-1 h-full w-full">
        <div class="content-container">
          <slot class="content" />
        </div>
      </ScrollArea>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import NavBar from "@/components/template/Navbar.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";

const { isAuthenticated } = useAuth();
const router = useRouter();

onMounted(() => {
  if (!isAuthenticated.value) {
    console.log("User is not authenticated");
    router.push("/error");
  }
});
</script>

<style scoped>
.navbar {
  margin: 10px 0px 0px 10px;
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

/* Responsiveness adjustments */
@media (max-width: 1024px) {
  main {
    width: 100%;
    height: auto;
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  main {
    padding: 3%;
    margin-top: 0;
  }
}

@media (max-width: 640px) {
  main {
    padding: 2%;
    margin-top: 0;
  }
}
</style>
