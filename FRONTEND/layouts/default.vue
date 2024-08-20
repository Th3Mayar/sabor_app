<template>
  <div class="flex flex-row">
    <NavBar />
    <main class="bg-mainContent w-[98.5%] h-[89vh] mt-[54px] p-5">
      <div>
        <slot class="content" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/template/Navbar.vue";
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
div {
  margin: 10px 0px 10px 10px;
}
</style>
