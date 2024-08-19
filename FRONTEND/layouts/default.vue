<template>
  <div class="flex flex-row">
    <NavBar />
    <main class="bg-mainContent w-[100%] h-[89vh] mt-[54px] p-5">
      <!-- <div class="bg-contentBackground rounded-3xl"> -->
      <div>
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
