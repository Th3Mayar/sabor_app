<template>
  <main class="flex flex-row items-center justify-center h-screen gap-4">
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <!-- Primary Button -->
      <Button variant="default">Primary Button</Button>

      <!-- Secondary Button -->
      <Button variant="secondary">Secondary Button</Button>

      <!-- Success Button -->
      <Button variant="success">Success Button</Button>

      <!-- Danger Button -->
      <Button variant="danger">Danger Button</Button>

      <!-- Outline Button -->
      <Button variant="outline">Outline Button</Button>

      <!-- Ghost Button -->
      <Button variant="ghost">Ghost Button</Button>

      <!-- Link Button -->
      <Button variant="link">Link Button</Button>

      <!-- Custom Variant Secondary Button -->
      <Button variant="variantSecondary">Custom Secondary Button</Button>

      <!-- Custom Variant Tertiary Button -->
      <Button variant="variantTertiary">Custom Tertiary Button</Button>

      <!-- Orange Button -->
      <Button variant="orange">Orange Button</Button>

      <!-- Simple Button with No Styles -->
      <Button variant="none">No Styles Button</Button>
    </div>
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <Icon name="Home" size="24" color="primary" />
      <Icon name="Settings" size="32" color="orange" />
      <Icon
        name="User"
        size="20"
        strokeWidth="2"
        color="green"
        className="custom-class"
      />
      <Icon
        name="Phone"
        size="20"
        strokeWidth="2"
        color="green"
        className="custom-class"
      />
    </div>
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <ImageComponent name="saborApp2" size="100" className="rounded" />
      <ImageComponent
        name="saborApp2"
        size="150"
        strokeWidth="2"
        className="border"
      />
    </div>
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <InputComponent
        name="username"
        label="Username"
        placeholder="Enter your username"
      />
      <InputComponent
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <DatePickerComponent
        name="reservationDate"
        label="Date of Reservation: "
        placeholder="Select a date"
        :daysToShow="30"
      />
    </div>
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <TextareaComponent
        name="additionalComments"
        label="Additional Comments"
        placeholder="Write your comments here"
      />
    </div>
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <Typography as="p" variant="Arial" color="textVariant3" caseType="capital"
        >text with arial variant</Typography
      >
      <Typography as="p" variant="Arial" color="textVariant2" caseType="capital"
        >text with arial variant</Typography
      >
      <Typography as="p" variant="Arial" color="textVariant1" caseType="capital"
        >text with arial variant</Typography
      >
      <Typography
        as="p"
        variant="Arial"
        color="buttonPrimary"
        caseType="capital"
        >text with arial variant</Typography
      >
      <Typography
        as="p"
        variant="Arial"
        color="buttonSuccess"
        caseType="capital"
        >text with arial variant</Typography
      >
    </div>
    <div class="flex flex-col items-center justify-center h-screen gap-4"></div>
    <div class="flex flex-col items-center justify-center h-screen gap-4"></div>
  </main>
  <section class="grid place-items-center h-screen">
    <Table :columns="columns" :rows="rows" />
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import DatePickerComponent from "@/components/molecule/DatePickerComponent.vue";
import TextareaComponent from "@/components/atoms/TextareaComponent.vue";
import Typography from "@/components/atoms/Typography.vue";
import Table from "@/components/template/Table.vue";
import { ref } from "vue";

const columns = ref([
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
