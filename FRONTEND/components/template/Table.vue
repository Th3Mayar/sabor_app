<template>
  <TooltipProvider>
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
              @click="openFilterModal(column)"
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
                <Icon
                  v-if="filters[column.field]"
                  name="Filter"
                  size="16"
                  color="white"
                  class="ml-2"
                />
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
              <div
                v-else-if="column.field === 'additional_comments'"
                class="relative"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <span>
                      {{
                        row[column.field] && row[column.field].length > 20
                          ? row[column.field].substring(0, 20) + "..."
                          : row[column.field] || ""
                      }}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{{ row[column.field] || "" }}</span>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div v-else class="bg-mainContent rounded-[30px] px-4 py-2">
                {{ row[column.field] }}
              </div>
            </td>
            <td
              class="px-6 py-4 text-xs sm:text-sm text-textPrimary whitespace-nowrap flex justify-center items-center space-x-2"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="tableActionBg" size="icon">
                    <Icon name="MoreVertical" size="16" color="white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem @click="editRow(row)">
                    <Icon name="Edit3" size="16" />
                    <span class="ml-2">Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="confirmRow(row)">
                    <Icon name="Check" size="16" />
                    <span class="ml-2">Confirmar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="deleteRow(row)">
                    <Icon name="Trash2" size="16" />
                    <span class="ml-2">Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal for filtering -->
    <FilterModal
      :isModalOpen="isModalOpen"
      :selectedColumnHeader="selectedColumnHeader"
      :selectedColumnField="selectedColumnField"
      @apply="applyFilter"
      @clear="clearFilter"
      @close="closeFilterModal"
    />
  </TooltipProvider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import type { LocalTableColumn, LocalTableRow } from "@/types/Table";
import TableSkeleton from "@/components/organism/TableSkeleton.vue";
import { urlAPI } from "~/composables/api/url";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import FilterModal from "@/components/organism/Modals/FilterModal.vue";

// State management
const isLoading = ref(true);
const selectedColumnIndex = ref<number | null>(null);
const activeFilterColumn = ref<string | null>(null);

// Modal state
const isModalOpen = ref(false);
const selectedColumnHeader = ref("");
const selectedColumnField = ref("");

// Define props
const props = defineProps<{
  columns?: LocalTableColumn[];
  rows: LocalTableRow[];
}>();

let draggedColumnIndex = ref<number | null>(null);
const filters = ref<{ [key: string]: { type: string; value: string } }>({});
const showFilterIndex = ref<number | null>(null);

const toggleFilter = (index: number) => {
  showFilterIndex.value = showFilterIndex.value === index ? null : index;
};

const selectColumn = (index: number) => {
  selectedColumnIndex.value = index;
};

const deselectColumn = () => {
  selectedColumnIndex.value = null;
};

// Open the modal to apply the filter
const openFilterModal = (column) => {
  console.log("Opening filter modal for column:", column);
  selectedColumnHeader.value = column.headerName;
  selectedColumnField.value = column.field;
  isModalOpen.value = true; 
  console.log("isModalOpen set to true:", isModalOpen.value);
};

const closeFilterModal = () => {
  isModalOpen.value = false;
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

const deleteRow = (row: LocalTableRow) => {
  console.log("Eliminando fila:", row);
};

// Apply filter based on modal input
const applyFilter = ({ field, type, value }) => {
  filters.value[field] = { type, value };
  isModalOpen.value = false; // Close the modal after applying the filter
};

// Clear filter
const clearFilter = (field) => {
  delete filters.value[field];
  isModalOpen.value = false; // Close the modal after clearing the filter
};

const filteredRows = computed(() => {
  if (!props.columns) return props.rows;

  return props.rows.filter((row) => {
    return props.columns!.every((column) => {
      if (!column) return true;

      const filter = filters.value[column.field];
      if (!filter || !filter.value) return true;

      const cellValue = String(row[column.field]).toLowerCase();
      const filterValue = filter.value.toLowerCase();

      switch (filter.type) {
        case "contains":
          return cellValue.includes(filterValue);
        case "equals":
          return cellValue === filterValue;
        case "startsWith":
          return cellValue.startsWith(filterValue);
        case "endsWith":
          return cellValue.endsWith(filterValue);
        default:
          return true;
      }
    });
  });
});
</script>
