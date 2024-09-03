<template>
  <div class="flex justify-center items-center space-x-4 mt-4">
    <button
      @click="previousPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-buttonPrimary text-white rounded disabled:opacity-50"
    >
      Anterior
    </button>

    <span>Página {{ currentPage }} de {{ totalPages }}</span>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-buttonPrimary text-white rounded disabled:opacity-50"
    >
      Siguiente
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["pageChange"]);

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("pageChange", props.currentPage + 1);
  }
};

const previousPage = () => {
  if (props.currentPage > 1) {
    emit("pageChange", props.currentPage - 1);
  }
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
