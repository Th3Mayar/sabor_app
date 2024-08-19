<template>
  <div class="min-h-screen flex flex-col p-5">
    <!-- Header -->
    <header class="relative w-full">
      <div class="overflow-hidden rounded-t-3xl">
        <ImageComponent
          name="welcome"
          class="w-full h-52 object-cover rounded-t-3xl"
        />
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-60 rounded-t-3xl"></div>
    </header>

    <!-- Main Content -->
    <section
      class="flex-grow flex items-center justify-center bg-mainContent py-12"
    >
      <div class="bg-background rounded-3xl shadow-lg p-5 w-full max-w-md">
        <div class="flex flex-col justify-center items-center text-center mb-6">
          <ImageComponent name="saborApp2" size="200" />
          <h2 class="text-2xl font-semibold mt-4">Bienvenido</h2>
        </div>
        <form>
          <div class="mb-4">
            <label for="username" class="block">Nombre de usuario</label>
            <div class="relative flex justify-center items-center">
              <Icon
                name="User"
                size="20"
                color="gray"
                class="absolute left-3"
              />
              <InputComponent
                name="username"
                id="username"
                placeholder="Nombre de usuario"
                class="w-full pl-10"
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="password" class="block">Contraseña</label>
            <div class="relative flex justify-center items-center">
              <Icon
                name="Lock"
                size="20"
                color="gray"
                class="absolute left-3"
              />
              <InputComponent
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
                class="w-full pl-10"
              />
            </div>
          </div>
          <Button type="submit" variant="default" class="w-full mt-4">
            Ingresar
          </Button>
        </form>
        <div class="flex flex-row text-center mt-4 gap-2 justify-center">
          <Link href="/home" variant="default">¿Olvidó Contraseña?</Link>
          <Link href="/home" variant="primary">Recuperar</Link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";
definePageMeta({
  layout: "authLayout",
});
</script>
