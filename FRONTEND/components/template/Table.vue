<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-background rounded-lg shadow-md">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.field"
            class="relative px-6 py-3 bg-buttonSecondary text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider first:rounded-tl-2xl last:rounded-tr-lg cursor-pointer"
            draggable="true"
            @click="toggleFilter(index)"
            @dragstart="dragStart($event, index)"
            @dragover.prevent
            @drop="drop(index)"
            @dragend="dragEnd"
          >
            <div class="flex items-center space-x-2">
              <Icon name="Move" size="16" color="white" />
              <span>{{ column.headerName }}</span>
            </div>
            <div
              v-if="showFilterIndex === index"
              class="absolute top-full left-0 w-full bg-white p-2 shadow-lg z-10"
            >
              <input
                v-if="column.type === 'text'"
                v-model="filters[column.field]"
                type="text"
                placeholder="Filter..."
                class="mt-2 p-1 w-full text-sm border rounded focus:outline-none"
              />
              <input
                v-if="column.type === 'checkbox'"
                v-model="filters[column.field]"
                type="checkbox"
                class="mt-2 p-1 text-sm border rounded focus:outline-none"
              />
              <select
                v-if="column.type === 'select'"
                v-model="filters[column.field]"
                class="mt-2 p-1 w-full text-sm border rounded focus:outline-none"
              >
                <option value="">All</option>
                <option
                  v-for="option in column.options"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </th>
          <th
            class="px-6 py-3 bg-buttonSecondary text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider rounded-tr-lg"
          >
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in filteredRows"
          :key="rowIndex"
          class="bg-white border-b border-gray-200 hover:bg-gray-100"
        >
          <td
            v-for="column in columns"
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

const dragStart = (event: DragEvent, index: number) => {
  draggedColumnIndex.value = index;
  document.body.classList.add("cursor-dragging");
};

const dragEnd = () => {
  document.body.classList.remove("cursor-dragging");
  saveColumnOrder();
};

const drop = (index: number) => {
  if (draggedColumnIndex.value !== null) {
    const draggedColumn = props.columns.splice(draggedColumnIndex.value, 1)[0];
    props.columns.splice(index, 0, draggedColumn);
    draggedColumnIndex.value = null;
  }
};

const saveColumnOrder = () => {
  localStorage.setItem("tableColumnOrder", JSON.stringify(props.columns));
};

const loadColumnOrder = () => {
  const savedColumns = localStorage.getItem("tableColumnOrder");
  if (savedColumns) {
    props.columns.splice(0, props.columns.length, ...JSON.parse(savedColumns));
  }
};

onMounted(() => {
  loadColumnOrder();
});

const getStatusClass = (status: string) => {
  switch (status) {
    case "Pendiente":
      return "bg-alertWarningBg text-white px-4 py-2 rounded-[30px] text-center";
    case "Asistio":
      return "bg-buttonSuccess text-white px-4 py-2 rounded-[30px] text-center";
    case "Cancelado":
      return "bg-buttonDanger text-white px-4 py-2 rounded-[30px] text-center";
    default:
      return "";
  }
};

const editRow = (row: LocalTableRow) => {
  console.log("Editando fila:", row);
};

const confirmRow = (row: LocalTableRow) => {
  console.log("Confirmando fila:", row);
};

const filteredRows = computed(() => {
  if (!props.columns) return props.rows; // Check if columns are undefined and return all rows

  return props.rows.filter((row) => {
    return props.columns!.every((column) => {
      if (!column) return true; // Add a check to ensure column is not undefined

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

<style scoped>
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #888 #ddd;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background-color: #ddd;
  border-radius: 2rem;
}

table {
  border-spacing: 0 10px;
}

th,
td {
  padding: 8px 12px;
}

.cursor-dragging {
  cursor: crosshair !important;
}
</style>
