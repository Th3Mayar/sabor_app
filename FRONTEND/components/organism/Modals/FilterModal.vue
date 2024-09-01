<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    ref="modalContent"
  >
    <div
      class="modal-enter bg-background rounded-lg p-6 max-w-lg w-80 shadow-[10px_10px_0px_-1px_rgba(0,0,0,0.5)] shadow-buttonPrimary/50"
    >
      <h2 class="text-lg font-semibold mb-4">
        Filtrar {{ selectedColumnHeader }}
      </h2>

      <div class="mb-4">
        <label class="block mb-2">Tipo de Filtro:</label>
        <FilterTableSelect
          v-model="filterType"
          :placeholder="'Seleccione un tipo de filtro'"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2">Valor de Filtro:</label>
        <InputComponent
          v-model="filterValue"
          type="text"
          placeholder="Ingrese valor"
          name="filterValue"
          class="-mt-1"
        />
      </div>

      <div class="flex justify-end space-x-4 mt-5">
        <Button @click="clearFilter" variant="tableActionBg" size="default">
          <Typography
            as="h6"
            variant="poppins"
            color="shadow"
            caseType="capital"
            class="font-semibold flex flex-row gap-2"
            ><Icon name="Eraser" size="20" color="dark" /> Limpiar</Typography
          >
        </Button>

        <Button @click="applyFilter" variant="success" size="default">
          <Typography
            as="h6"
            variant="poppins"
            color="shadow"
            caseType="capital"
            class="font-semibold flex flex-row gap-2"
            ><Icon name="Save" size="20" color="dark" /> Aplicar</Typography
          >
        </Button>
      </div>

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
import FilterTableSelect from "@/components/organism/FilterTableSelect.vue"; // Adjust the import path as necessary
import Button from "@/components/atoms/Button.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Modal from "@/components/organism/Modal.vue";

const props = defineProps({
  isModalOpen: Boolean,
  selectedColumnHeader: String,
  selectedColumnField: String,
});

const emit = defineEmits(["apply", "clear", "close"]);

const filterType = ref("contains");
const filterValue = ref("");
const modalContent = ref(null);

const closeModal = () => {
  modalContent.value.classList.add("modal-close");
  setTimeout(() => {
    emit("close");
  }, 500);
};

const clearFilter = (e: any) => {
  e.preventDefault();
  filterValue.value = "";
  emit("clear", props.selectedColumnField);
  closeModal();
};

const applyFilter = (e: any) => {
  e.preventDefault();
  emit("apply", {
    field: props.selectedColumnField,
    type: filterType.value,
    value: filterValue.value,
  });
  closeModal();
};
</script>

<style scoped>
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
