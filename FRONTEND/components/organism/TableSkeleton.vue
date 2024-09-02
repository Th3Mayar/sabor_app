<template>
  <div class="overflow-x-auto">
    <table
      class="min-w-full bg-background dark:bg-dark-background rounded-lg shadow-md"
    >
      <thead>
        <tr>
          <th
            v-for="index in columnCount"
            :key="index"
            class="px-6 py-3 bg-mainContent dark:bg-dark-skeleton animate-pulse"
          >
            <div
              class="h-4 bg-contentBackground dark:bg-dark-skeleton rounded w-3/4 mx-auto"
            ></div>
          </th>
          <th
            class="px-6 py-3 bg-mainContent dark:bg-dark-skeleton animate-pulse"
          >
            <div
              class="h-4 bg-contentBackground dark:bg-dark-skeleton rounded w-3/4 mx-auto"
            ></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="index in rowCount"
          :key="index"
          class="bg-background dark:bg-dark-background border-b dark:border-dark-shadow"
        >
          <td
            v-for="colIndex in columnCount"
            :key="colIndex"
            class="px-6 py-4 animate-pulse"
          >
            <div
              class="h-4 bg-mainContent dark:bg-dark-skeleton rounded w-full"
            ></div>
          </td>
          <td class="px-6 py-4 animate-pulse">
            <div class="flex justify-center space-x-2">
              <div
                class="h-4 bg-mainContent dark:bg-dark-skeleton rounded-full w-8"
              ></div>
              <div
                class="h-4 bg-mainContent dark:bg-dark-skeleton rounded-full w-8"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  columnCount: number;
  rowCount: number;
}>();
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
