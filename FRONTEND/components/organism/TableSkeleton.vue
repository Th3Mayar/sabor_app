<template>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th
              v-for="index in columnCount"
              :key="index"
              class="px-6 py-3 bg-gray-200 animate-pulse"
            >
              <div class="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </th>
            <th class="px-6 py-3 bg-gray-200 animate-pulse">
              <div class="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in rowCount" :key="index" class="bg-white border-b">
            <td
              v-for="colIndex in columnCount"
              :key="colIndex"
              class="px-6 py-4 animate-pulse"
            >
              <div class="h-4 bg-gray-200 rounded w-full"></div>
            </td>
            <td class="px-6 py-4 animate-pulse">
              <div class="flex justify-center space-x-2">
                <div class="h-4 bg-gray-200 rounded-full w-8"></div>
                <div class="h-4 bg-gray-200 rounded-full w-8"></div>
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
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  </style>
  