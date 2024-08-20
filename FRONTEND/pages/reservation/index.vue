<template>
  <div class="flex flex-col items-start justify-center p-2 w-full h-full">
    <form class="flex flex-col w-[100%]">
      <section class="w-[100%] bg-contentBackground rounded-t-3xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-[50%] m-10">
          <div class="col-span-2">
            <InputComponent
              name="fullName"
              label="Nombres Completos:"
              placeholder="Ingrese sus nombres completos"
              class="w-full"
            />
          </div>
          <div class="col-span-2">
            <InputComponent
              name="phone"
              label="Teléfono de Contacto:"
              placeholder="Ingrese su teléfono"
              class="w-full"
            />
          </div>
          <div class="col-span-2 flex flex-col md:flex-row items-start">
            <InputComponent
              name="email"
              label="Correo Electrónico:"
              type="email"
              placeholder="Ingrese su correo"
              class="w-full md:w-[70%]"
            />
            <select
              class="mt-8 relative px-4 py-3 pr-10 rounded-[25px] bg-background shadow-md border border-mainContent outline-none transition-shadow duration-300 text-base text-textPrimary appearance-none"
            >
              <Option value="gmail">Gmail</Option>
              <Option value="yahoo">Yahoo</Option>
              <Option value="outlook" disabled>Outlook (Disabled)</Option>
            </select>
          </div>
          <div>
            <DatePickerComponent
              name="reservationDate"
              label="Fecha de Reserva:"
              placeholder="Seleccione fecha"
              :daysToShow="30"
              class="w-full"
            />
          </div>
          <div>
            <DatePickerComponent
              name="reservationTime"
              label="Horario:"
              placeholder="Seleccione Horario"
              :daysToShow="10"
              class="w-full"
            />
          </div>
          <div class="col-span-2 flex items-center mt-4 gap-3">
            <Typography
              as="label"
              variant="Arial"
              color="textPrimary"
              class="mr-4"
              >Cantidad de Personas:</Typography
            >
            <Button variant="tableActionBg" size="icon">-</Button>
            <InputComponent
              name="peopleCount"
              label=""
              placeholder="0"
              class="text-center w-[60px]"
            />
            <Button variant="tableActionBg" size="icon">+</Button>
          </div>
          <div class="col-span-2">
            <TextareaComponent
              name="additionalComments"
              label="Comentarios Adicionales:"
              placeholder="Escriba algún dato a tener en cuenta para su reserva"
              class="w-full"
            />
          </div>
        </div>
      </section>
      <div class="flex justify-end mt-8 space-x-4">
        <Button variant="danger" size="lg">Cancelar reserva</Button>
        <Button variant="success" size="lg">Enviar reserva</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import DatePickerComponent from "@/components/molecule/DatePickerComponent.vue";
import TextareaComponent from "@/components/atoms/TextareaComponent.vue";
import Typography from "@/components/atoms/Typography.vue";
import Option from "@/components/atoms/OptionComponent.vue";

definePageMeta({
  middleware: 'auth'
});
</script>