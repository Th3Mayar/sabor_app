<template>
  <div class="flex flex-row">
    <NavBar />
    <main class="bg-mainContent w-[100%] h-[91vh] mt-[68px] p-5">
      <div class="bg-contentBackground rounded-3xl">
        <slot class="content" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/template/Navbar.vue";
</script>

<style scoped>
div {
  margin: 10px 0px 10px 10px;
}
</style>
