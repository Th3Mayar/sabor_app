<template>
  <main class="flex items-center justify-center gap-4">
    <section class="grid place-items-center h-screen -mt-20">
      <Table :columns="columns" :rows="rows" />
    </section>
  </main>
</template>

<script setup lang="ts">
import Table from "@/components/template/Table.vue";
import { ref } from "vue";
import type { LocalTableColumn } from "@/types/Table";

const columns = ref<LocalTableColumn[]>([
  { headerName: "ID Ticket", field: "id", type: "text", filterable: true },
  { headerName: "Fecha", field: "fecha", type: "text", filterable: true },
  { headerName: "Horario", field: "horario", type: "text", filterable: true },
  {
    headerName: "N° Personas",
    field: "numPersonas",
    type: "text",
    filterable: true,
  },
  {
    headerName: "Estado",
    field: "status",
    type: "select",
    filterable: true,
    options: ["Pendiente", "Asistio", "Cancelado"],
  },
]);

const rows = ref([
  {
    ticketId: "AB001",
    fecha: "2023-08-01",
    horario: "10:00 AM",
    personas: 3,
    status: "Pendiente",
  },
  {
    ticketId: "AB002",
    fecha: "2023-08-02",
    horario: "11:00 AM",
    personas: 2,
    status: "Asistio",
  },
  {
    ticketId: "AB003",
    fecha: "2023-08-03",
    horario: "12:00 PM",
    personas: 5,
    status: "Asistio",
  },
  {
    ticketId: "AB004",
    fecha: "2023-08-04",
    horario: "01:00 PM",
    personas: 4,
    status: "Cancelado",
  },
  {
    ticketId: "AB004",
    fecha: "2023-08-04",
    horario: "01:00 PM",
    personas: 4,
    status: "Cancelado",
  },
  {
    ticketId: "AB004",
    fecha: "2023-08-04",
    horario: "01:00 PM",
    personas: 4,
    status: "Cancelado",
  },
  {
    ticketId: "AB004",
    fecha: "2023-08-04",
    horario: "01:00 PM",
    personas: 4,
    status: "Cancelado",
  },
  {
    ticketId: "AB004",
    fecha: "2023-08-04",
    horario: "01:00 PM",
    personas: 4,
    status: "Cancelado",
  },
  {
    ticketId: "AB004",
    fecha: "2023-08-04",
    horario: "01:00 PM",
    personas: 4,
    status: "Cancelado",
  },
  {
    ticketId: "AB004",
    fecha: "2023-08-04",
    horario: "01:00 PM",
    personas: 4,
    status: "Cancelado",
  },
]);
</script>
