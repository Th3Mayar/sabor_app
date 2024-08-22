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
            class="relative px-6 py-3 bg-buttonSecondary text-left text-xs sm:text-sm font-semibold text-background uppercase tracking-wider first:rounded-tl-2xl cursor-pointer"
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
              class="absolute top-full left-0 w-full bg-background p-2 shadow-lg z-10"
            >
            </div>
          </th>
          <th
            v-if="!isLoading"
            class="px-6 py-3 bg-buttonSecondary text-left text-xs sm:text-sm font-semibold text-background uppercase tracking-wider rounded-tr-lg cursor-pointer"
            draggable="true"
            @dragstart="dragStart($event, columns.length)"
            @dragover.prevent
            @drop="drop(columns.length)"
            @dragend="dragEnd"
          >
            <div class="flex items-center space-x-2">
              <Icon name="Move" size="16" color="white" />
              <span>Acción</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in filteredRows"
          :key="rowIndex"
          class="bg-background border-b border-mainContent hover:mainContent"
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
            v-if="!isLoading"
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

const isLoading = ref(true);

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
  event.dataTransfer!.dropEffect = "move";
  const th = event.target as HTMLElement;
  th.style.backgroundColor = "var(--button-primary)";
};

const dragEnd = () => {
  document.body.classList.remove("cursor-dragging");
  saveColumnOrder();
};

const drop = (index: number) => {
  if (draggedColumnIndex.value !== null) {
    if (draggedColumnIndex.value >= props.columns.length) {
      const actionColumn = "Acción";
      const draggedColumn = props.columns.splice(draggedColumnIndex.value, 1)[0];
      props.columns.splice(index, 0, draggedColumn);
    } else {
      const draggedColumn = props.columns.splice(draggedColumnIndex.value, 1)[0];
      props.columns.splice(index, 0, draggedColumn);
    }
    draggedColumnIndex.value = null;
  }
};

const saveColumnOrder = () => {
  localStorage.setItem("tableColumnOrder", JSON.stringify(props.columns));
  const ths = document.querySelectorAll("th");
  ths.forEach((th) => {
    (th as HTMLElement).style.backgroundColor = "";
  });
};

const loadColumnOrder = () => {
  const savedColumns = localStorage.getItem("tableColumnOrder");
  if (savedColumns) {
    props.columns.splice(0, props.columns.length, ...JSON.parse(savedColumns));
  }
};

onMounted(() => {
  loadColumnOrder();
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
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
