<template>
  <div
    class="bg-contentBackground dark:bg-dark-contentBackground p-6 rounded-[28px] shadow-lg h-[max-content] overflow-hidden"
  >
    <!-- Title -->
    <h1
      class="text-left font-bold text-2xl mb-5 pl-2 font-poppins text-textPrimary dark:text-dark-textPrimary"
    >
      Mis Reservas
    </h1>

    <section>
      <!-- Table for view reservations -->
      <ScrollArea class="overflow-x-auto overflow-y-auto rounded-lg">
        <Table :columns="columns" :rows="rows" />
      </ScrollArea>
    </section>
  </div>
</template>

<script setup lang="ts">
import Table from "@/components/template/Table.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import { ref, onMounted } from "vue";
import { urlAPI } from "~/composables/api/url";

const columns = ref([]);
const rows = ref([]);

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
