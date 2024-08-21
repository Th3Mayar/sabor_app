<template>
  <div
    class="menu-container bg-contentBackground p-6 rounded-lg shadow-lg h-[max-content]"
  >
    <!-- Título -->
    <h1 class="text-left font-bold text-2xl mb-5 pl-2 font-poppins">
      Mis Reservas
    </h1>

    <section class="ml-40 mr-40 mt-12">
      <!-- Table para ver las reservas -->
      <Table :columns="columns" :rows="rows" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Table from "@/components/template/Table.vue";
import { ref, onMounted } from "vue";
import type { LocalTableColumn } from "@/types/Table";
import { urlAPI } from "~/composables/api/url";

// Definir columnas de la tabla en el formato especificado
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

// Definir filas de la tabla
const rows = ref([]);

// Obtener data del backend cuando el componente se monta
onMounted(async () => {
  try {
    const response = await fetch(`${urlAPI}/reservations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.VUE_APP_API_KEY}`,
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      // Mapear la data para estructurarla en filas
      rows.value = data.map((item: any) => ({
        id: item.reservation_id,
        fecha: item.reservation_details.reservation_date || item.reservation_details.date,
        horario: item.reservation_details.time,
        numPersonas: item.reservation_details.people_count || item.reservation_details.guest_count,
        status: mapStatus(item.state_id),
      }));
    } else {
      console.error("Error en la respuesta del servidor:", response.statusText);
    }
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
  }
});

// Función para mapear el estado según state_id
function mapStatus(state_id: number): string {
  switch (state_id) {
    case 1:
      return "Pendiente";
    case 2:
      return "Asistio";
    case 3:
      return "Cancelado";
    default:
      return "Desconocido";
  }
}
</script>
