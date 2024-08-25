<template>
  <div
    class="relative flex items-center justify-center w-full h-full p-5 bg-contentBackground"
  >
    <div class="bg-white rounded-2xl p-8 shadow-lg w-full max-w-xl relative">
      <div class="absolute top-4 right-4">
        <ImageComponent name="saborApp2" size="70" />
      </div>
      <h1 class="text-3xl font-bold text-center mb-5 text-buttonPrimary">
        SABORAPP
      </h1>
      <p class="text-lg font-semibold text-center mb-5">
        RESERVA EL {{ formatDate(reservationDetails.date) }}
        <br />
        <span class="text-textVariant2"
          ><b>HORA:</b> {{ reservationDetails.time }}</span
        >
      </p>
      <div class="space-y-4">
        <div
          v-if="reservationDetails.name"
          class="flex justify-between border-b border-gray-300 pb-2"
        >
          <span class="font-bold text-textPrimary">Nombre Completo:</span>
          <span class="text-textPrimary">{{ reservationDetails.name }}</span>
        </div>
        <div
          v-if="reservationDetails.phone"
          class="flex justify-between border-b border-gray-300 pb-2"
        >
          <span class="font-bold text-textPrimary">Teléfono de contacto:</span>
          <span class="text-textPrimary">{{ reservationDetails.phone }}</span>
        </div>
        <div
          v-if="reservationDetails.email"
          class="flex justify-between border-b border-gray-300 pb-2"
        >
          <span class="font-bold text-textPrimary">Correo Electrónico:</span>
          <span class="text-textPrimary">{{ reservationDetails.email }}</span>
        </div>
        <div
          v-if="reservationDetails.peopleCount"
          class="flex justify-between border-b border-gray-300 pb-2"
        >
          <span class="font-bold text-textPrimary">Cantidad de personas:</span>
          <span class="text-textPrimary">{{
            reservationDetails.peopleCount
          }}</span>
        </div>
        <div v-if="reservationDetails.comments" class="flex flex-col">
          <span class="font-bold text-textPrimary">Comentarios:</span>
          <span class="text-textPrimary mt-2">{{
            reservationDetails.comments
          }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="
        !reservationDetails.name &&
        !reservationDetails.phone &&
        !reservationDetails.email &&
        !reservationDetails.date &&
        !reservationDetails.time &&
        !reservationDetails.peopleCount &&
        !reservationDetails.comments
      "
      class="placeholder"
    ></div>
  </div>
</template>

<script setup>
import ImageComponent from "@/components/atoms/ImageByName.vue";

const props = defineProps({
  reservationDetails: {
    type: Object,
    required: true,
  },
});

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.placeholder {
  font-size: 16px;
  color: #777;
}
</style>
