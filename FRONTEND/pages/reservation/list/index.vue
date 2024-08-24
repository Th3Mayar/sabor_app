<template>
  <div
    class="bg-contentBackground p-6 rounded-lg shadow-lg h-[max-content]"
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
import { urlAPI } from "~/composables/api/url";

// Definir filas de la tabla
const columns = ref([]);
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

      // Asignar las columnas y las filas recibidas del backend
      columns.value = data.columns;
      rows.value = data.rows;
    } else {
      console.error("Error en la respuesta del servidor:", response.statusText);
    }
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
  }
});
</script>
