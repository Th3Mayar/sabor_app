<template>
  <div
    class="flex flex-col lg:flex-row items-start justify-center w-full h-full bg-contentBackground p-4 sm:p-6 md:p-8 lg:p-10 rounded-t-[20px]"
  >
    <form class="flex flex-col w-full lg:w-[50%]" @input="updateProgress">
      <header class="w-full bg-gray-300 rounded-full">
        <div
          class="h-2.5 rounded-full transition-all duration-300 bar-progress"
          :class="progress === 100 ? 'bg-alertSuccessBg' : 'bg-buttonPrimary'"
          :style="{ width: `${progress}%` }"
        ></div>
      </header>
      <section class="w-full rounded-t-3xl">
        <div
          class="grid grid-cols-1 gap-4 sm:gap-6 w-full m-auto py-8 sm:py-10"
        >
          <InputComponent
            v-model="form.fullName"
            label="Nombres Completos:"
            placeholder="Nombre completo"
            name="fullName"
          />
          <InputComponent
            v-model="form.phone"
            label="Teléfono de Contacto:"
            placeholder="Teléfono"
            name="phone"
          />
          <div>
            <label for="email" class="font-medium text-textPrimary">
              <Typography
                as="h6"
                variant="poppins"
                color="shadow"
                caseType="capital"
                class="font-semibold"
                >Correo Electrónico:</Typography
              >
            </label>
            <EmailInput v-model="form.email" />
          </div>
          <section class="flex flex-col sm:flex-row gap-6">
            <div>
              <DatePicker
                name="reservationDate"
                label="Fecha de reserva"
                placeholder="Seleccione fecha"
                :daysToShow="30"
                class="w-full"
                v-model="form.reservationDate"
              />
            </div>
            <div>
              <TimePicker
                v-model="form.reservationTime"
                name="reservationTime"
                label="Hora de reserva"
              />
            </div>
          </section>
          <NumberField
            label="Cantidad de personas"
            v-model="form.peopleCount"
            :increment="incrementPeopleCount"
            :decrement="decrementPeopleCount"
          />
          <Textarea
            label="Comentarios adicionales"
            v-model="form.additionalComments"
            placeholder="Comentarios adicionales"
            name="additionalComments"
          />
        </div>
      </section>
      <div
        class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 -mt-3 mb-6"
      >
        <Button variant="danger" size="lg" @click="cancelReservation">
          <Typography
            as="h6"
            variant="poppins"
            color="shadow"
            caseType="capital"
            class="font-semibold"
            >Cancelar Reserva</Typography
          ></Button
        >
        <Button variant="success" size="lg" @click="submitForm">
          <Typography
            as="h6"
            variant="poppins"
            color="shadow"
            caseType="capital"
            class="font-semibold"
            >Enviar Reserva</Typography
          ></Button
        >
      </div>
    </form>
    <section
      class="hidden lg:flex lg:w-[40%] h-full items-center justify-center pl-6 pt-6 sm:pl-10 sm:pt-8"
    >
      <ReservationAnimation
        :reservationDetails="{
          name: form.fullName,
          phone: form.phone,
          email: form.email,
          date: form.reservationDate ? dateSelected : currentDate,
          time: form.reservationTime,
          peopleCount: form.peopleCount,
          comments: form.additionalComments,
        }"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "@/components/atoms/Button.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import DatePicker from "@/components/organism/DatePicker.vue";
import TimePicker from "@/components/organism/TimePicker.vue";
import ReservationAnimation from "@/components/atoms/ReservationAnimation.vue";
import EmailInput from "@/components/organism/EmailInput.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import Typography from "@/components/atoms/Typography.vue";
import NumberField from "@/components/molecule/NumberField.vue";

const form = ref({
  fullName: "",
  phone: "",
  email: "",
  reservationDate: null,
  reservationTime: null ?? "08:00 AM",
  peopleCount: 0,
  additionalComments: "",
});

const currentDate = new Date();

const dateSelected = computed(() => {
  const selectedDate = form.value.reservationDate
    ? new Date(form.value.reservationDate)
    : currentDate;

  selectedDate.setDate(selectedDate.getDate() + 1);

  return selectedDate;
});

const progress = computed(() => {
  let completedSections = 0;
  if (form.value.fullName) completedSections++;
  if (form.value.phone) completedSections++;
  if (form.value.email) completedSections++;
  if (form.value.reservationDate) completedSections++;
  if (form.value.reservationTime) completedSections++;
  if (form.value.peopleCount > 0) completedSections++;
  if (form.value.additionalComments) completedSections++;

  return (completedSections / 7) * 100;
});

const updateProgress = () => {};

const cancelReservation = () => {};

const incrementPeopleCount = () => {
  form.value.peopleCount++;
};

const decrementPeopleCount = () => {
  if (form.value.peopleCount > 1) {
    form.value.peopleCount--;
  }
};

const submitForm = () => {};
</script>
