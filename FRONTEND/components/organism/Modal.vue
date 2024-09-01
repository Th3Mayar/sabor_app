<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    ref="modalContent"
  >
    <div
      class="modal-enter bg-background rounded-lg p-6 max-w-lg w-80 shadow-[10px_10px_0px_-1px_rgba(0,0,0,0.5)] shadow-buttonPrimary/50"
    >
      <!-- Header Slot -->
      <header v-if="$slots.header" class="mb-4">
        <slot name="header"></slot>
      </header>

      <!-- Main Content Slot -->
      <main class="mb-4">
        <slot name="main"></slot>
      </main>

      <!-- Footer Slot -->
      <footer v-if="$slots.footer" class="flex justify-end space-x-4 mt-5">
        <slot name="footer"></slot>
      </footer>

      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <Icon name="X" size="30" color="dark" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Icon from "@/components/atoms/IconByName.vue"; // Adjust the import path as necessary

const props = defineProps({
  isModalOpen: Boolean,
});

const emit = defineEmits(["close"]);

const modalContent = ref(null);

const closeModal = () => {
  modalContent.value.classList.add("modal-close");
  setTimeout(() => {
    emit("close");
  }, 500);
};
</script>

<style scoped>
.fixed.inset-0.flex.items-center.justify-center.z-50 {
  z-index: 9999;
}

@keyframes modalFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modalFadeOff {
  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
  0% {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-enter {
  animation: modalFadeIn 0.5s ease-out forwards;
}

.modal-close {
  animation: modalFadeOff 0.5s ease-out forwards;
}
</style>
