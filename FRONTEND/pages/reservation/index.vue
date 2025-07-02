<template>
  <div
    class="flex flex-col lg:flex-row items-start justify-center w-full h-full bg-contentBackground dark:bg-dark-contentBackground p-4 sm:p-6 md:p-8 lg:p-10 md:rounded-[28px]"
  >
    <Form
      class="flex flex-col w-full lg:w-[50%]"
      @input="updateProgress"
      @submit.prevent="submitForm"
    >
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
            mask="'# (###) ###-####'"
            label="Teléfono de Contacto:"
            placeholder="Teléfono"
            name="phone"
            type="text"
          />
          <div>
            <label for="email" class="font-medium text-textPrimary">
              <Typography
                as="h6"
                variant="poppins"
                color="darkBackground"
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
        <Button
          :disabled="isSubmitting"
          variant="danger"
          size="lg"
          @click="cancelReservation"
        >
          <Typography
            as="h6"
            variant="poppins"
            color="darkBackground"
            caseType="capital"
            class="font-semibold text-background fixColor"
            >Cancelar Reserva</Typography
          >
        </Button>
        <Button :disabled="isSubmitting" variant="success" size="lg">
          <Typography
            as="h6"
            variant="poppins"
            color="darkBackground"
            caseType="capital"
            class="font-semibold fixColor"
            >Enviar Reserva</Typography
          >
        </Button>
      </div>
    </form>
    <section
      class="hidden lg:flex lg:w-[40%] h-full items-center justify-center pl-6 pt-6 sm:pl-10 sm:pt-8 w-full"
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
    <Alert
      v-if="showAlert"
      type="error"
      title="Error al crear la reserva"
      :content="alertMessage"
      iconColor="white"
      :isVisible="true"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "@/components/atoms/Button.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Alert from "@/components/atoms/AlertComponent.vue";
import DatePicker from "@/components/organism/DatePicker.vue";
import TimePicker from "@/components/organism/TimePicker.vue";
import ReservationAnimation from "@/components/atoms/ReservationAnimation.vue";
import EmailInput from "@/components/organism/EmailInput.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import Typography from "@/components/atoms/Typography.vue";
import NumberField from "@/components/molecule/NumberField.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { urlAPI } from "~/composables/api/url";

const currentDate = new Date();

// State for management form
const form = ref({
  fullName: "",
  phone: "+1",
  email: "",
  reservationDate: null,
  reservationTime: null ?? "08:00 AM",
  peopleCount: 0,
  additionalComments: "",
});

const showAlert = ref(false);
const alertMessage = ref("");
const isSubmitting = ref(false); // State for management request

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

const updateProgress = () => {
  console.log(`Form progress: ${progress.value}%`);
};
const cancelReservation = () => {};

const incrementPeopleCount = () => {
  form.value.peopleCount++;
};

const decrementPeopleCount = () => {
  if (form.value.peopleCount > 1) {
    form.value.peopleCount--;
  }
};

const schema = Yup.object({
  fullName: Yup.string().required("El nombre completo es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio"),
  email: Yup.string().required("El correo es obligatorio"),
  reservationDate: Yup.date().required("La fecha de reserva es obligatoria"),
  reservationTime: Yup.string().required("La hora de reserva es obligatoria"),
  peopleCount: Yup.number()
    .min(1, "Debe haber al menos 1 persona")
    .required("El número de personas es obligatorio"),
  additionalComments: Yup.string().optional(),
});

const { resetForm } = useForm({
  validationSchema: schema,
});

const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  }
  return null;
};

function formatDate(dateInput) {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const submitForm = async () => {
  if (isSubmitting.value) return; // No send multi-request

  isSubmitting.value = true; // Mark in progress
  console.log("submitForm triggered");
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error("Usuario no autenticado. Por favor, inicie sesión.");
    }

    const response = await fetch(`${urlAPI}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.VUE_APP_API_KEY}`,
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        user_id: userId,
        reservation_details: {
          date: formatDate(form.value.reservationDate),
          time: form.value.reservationTime,
          fullName: form.value.fullName,
          phone: form.value.phone,
          email: form.value.email,
          guest_count: form.value.peopleCount,
          additional_comments: form.value.additionalComments,
        },
        state_id: 1,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      resetForm();
      isSubmitting.value = false; // Mark is not progress
    } else {
      const errorText = await response.text();
      throw new Error(`Error al crear la reserva: ${errorText}`);
    }
  } catch (error) {
    alertMessage.value = error.message;
    showAlert.value = true;
    isSubmitting.value = false; // Mark is not progress
  }
};
</script>

<style scoop>
.fixColor {
  color: var(--color-textPrimary);
}
</style>
