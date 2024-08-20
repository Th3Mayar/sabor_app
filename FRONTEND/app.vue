<template>
  <div>
    <NuxtLayout>
      <div v-if="isLoading" class="loader">
        <span></span>
      </div>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useLoading } from "@/composables/useLoading";

const { isLoading } = useLoading();
</script>
