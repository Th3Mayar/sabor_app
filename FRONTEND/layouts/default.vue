<template>
  <div v-if="isAuthenticated">
    <NavBar />
    <main class="bg-mainContent w-[98.5%] h-[89vh] mt-[54px] p-5">
      <div>
        <slot class="content" />
      </div>
    </main>
  </div>
  <div v-else>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import NavBar from "@/components/template/Navbar.vue";

const { isAuthenticated } = useAuth();
const router = useRouter();

if (!isAuthenticated.value) {
  router.push("/error");
}
</script>

<style scoped>
div {
  margin: 10px 0px 10px 10px;
}
</style>
