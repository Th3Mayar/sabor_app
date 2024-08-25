<template>
  <TableSkeleton
    v-if="isLoading"
    :columnCount="columns?.length || 5"
    :rowCount="5"
  />
  <div v-else class="overflow-x-auto">
    <table class="min-w-full bg-background rounded-lg shadow-md">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.field"
            :class="[
              'relative px-6 py-3 bg-buttonSecondary text-left text-xs sm:text-sm font-semibold text-background uppercase tracking-wider first:rounded-tl-2xl cursor-pointer',
              draggedColumnIndex === index ? 'bg-listOptionEffect' : '',
              selectedColumnIndex === index ? 'bg-buttonPrimary' : '',
            ]"
            draggable="true"
            @click="toggleFilter(index)"
            @dragstart="dragStart($event, index)"
            @dragover.prevent
            @drop="drop(index)"
            @dragend="dragEnd"
            @mouseenter="selectColumn(index)"
            @mouseleave="deselectColumn"
          >
            <div class="flex items-center space-x-2">
              <Icon name="Move" size="16" color="white" />
              <span>{{ column.headerName }}</span>
            </div>
          </th>
          <th
            class="px-6 py-3 bg-buttonSecondary text-left text-xs sm:text-sm font-semibold text-background uppercase tracking-wider rounded-tr-lg"
          >
            <div class="flex items-center space-x-2">
              <Icon name="Pin" size="16" color="white" />
              <span>Acción</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in filteredRows"
          :key="rowIndex"
          class="bg-background border-b border-mainContent hover:bg-textPrimary hover:bg-opacity-10"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="column.field"
            class="px-6 py-4 text-xs sm:text-sm text-textPrimary whitespace-nowrap"
          >
            <div
              v-if="column.field === 'status'"
              :class="getStatusClass(row[column.field])"
            >
              {{ row[column.field] }}
            </div>
            <div v-else class="bg-mainContent rounded-[30px] px-4 py-2">
              {{ row[column.field] }}
            </div>
          </td>
          <td
            class="px-6 py-4 text-xs sm:text-sm text-textPrimary whitespace-nowrap flex justify-center items-center space-x-2"
          >
            <Button variant="tableActionBg" size="icon" @click="editRow(row)">
              <Icon name="Edit3" size="16" color="white" />
            </Button>
            <Button
              variant="tableActionBg"
              size="icon"
              @click="confirmRow(row)"
            >
              <Icon name="Check" size="16" color="white" />
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import type { LocalTableColumn, LocalTableRow } from "@/types/Table";
import TableSkeleton from "@/components/organism/TableSkeleton.vue";
import { urlAPI } from "~/composables/api/url";

const isLoading = ref(true);
const selectedColumnIndex = ref<number | null>(null); // Para rastrear la columna seleccionada

const props = defineProps<{
  columns?: LocalTableColumn[];
  rows: LocalTableRow[];
}>();

let draggedColumnIndex = ref<number | null>(null);
const filters = ref<{ [key: string]: any }>({});
const showFilterIndex = ref<number | null>(null);

const toggleFilter = (index: number) => {
  showFilterIndex.value = showFilterIndex.value === index ? null : index;
};

const selectColumn = (index: number) => {
  selectedColumnIndex.value = index; // Columna seleccionada
};

const deselectColumn = () => {
  selectedColumnIndex.value = null; // Des-seleccionar columna
};

const dragStart = (event: DragEvent, index: number) => {
  draggedColumnIndex.value = index;
  document.body.classList.add("cursor-dragging");
  event.dataTransfer!.dropEffect = "move";
};

const dragEnd = () => {
  document.body.classList.remove("cursor-dragging");
  draggedColumnIndex.value = null;
};

const drop = (index: number) => {
  if (draggedColumnIndex.value !== null) {
    const draggedColumn = props.columns.splice(draggedColumnIndex.value, 1)[0];
    props.columns.splice(index, 0, draggedColumn);
    draggedColumnIndex.value = null;
    saveColumnOrder(props.columns, index);
  }
};

const saveColumnOrder = async (columns, index) => {
  try {
    const response = await fetch(`${urlAPI}/column-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ columns }),
    });

    if (!response.ok) {
      throw new Error("Failed to save column order");
    }

    const data = await response.json();
    console.log("Column order saved successfully:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isLoading.value = false;
});

const getStatusClass = (status: string) => {
  switch (status) {
    case "Pendiente":
      return "bg-alertWarningBg text-white px-4 py-2 rounded-[30px] text-center";
    case "Atendido":
      return "bg-buttonSuccess text-white px-4 py-2 rounded-[30px] text-center";
    case "Cancelado":
      return "bg-buttonDanger text-white px-4 py-2 rounded-[30px] text-center";
    case "Activo":
      return "bg-buttonPrimary text-white px-4 py-2 rounded-[30px] text-center";
    case "Inactivo":
      return "bg-buttonSecondary text-white px-4 py-2 rounded-[30px] text-center";
    case "En revision":
    case "En revisión":
      return "bg-buttonWarning text-white px-4 py-2 rounded-[30px] text-center";
    default:
      return "bg-mainContent text-dark-background px-4 py-2 rounded-[30px] text-center";
  }
};

const editRow = (row: LocalTableRow) => {
  console.log("Editando fila:", row);
};

const confirmRow = (row: LocalTableRow) => {
  console.log("Confirmando fila:", row);
};

const filteredRows = computed(() => {
  if (!props.columns) return props.rows;

  return props.rows.filter((row) => {
    return props.columns!.every((column) => {
      if (!column) return true;

      const filterValue = filters.value[column.field];
      if (!filterValue) return true;

      if (column.type === "text" || column.type === "select") {
        return String(row[column.field])
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }

      if (column.type === "checkbox") {
        return row[column.field] === filterValue;
      }

      return true;
    });
  });
});
</script>
