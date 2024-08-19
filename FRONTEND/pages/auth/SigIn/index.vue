<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 bg-cover bgContent"
  >
    <div class="bg-background rounded-3xl shadow-lg p-8 w-full max-w-md z-50">
      <div class="flex flex-col justify-center items-center text-center mb-6">
        <ImageComponent name="saborApp2" size="150" />
        <h2 class="text-3xl font-bold mt-4">Iniciar Sesión</h2>
        <p class="mt-2 text-textVariant2">
          ¡Ingresa a nuestra ventana de login y déjanos llevarte a un viaje
          gastronómico inolvidable en Restaurante {{ name }}!
        </p>
      </div>
      <form>
        <div class="mb-4">
          <label for="username" class="block text-textVariant2"
            >Nombre de Usuario</label
          >
          <div class="relative">
            <Icon
              name="User"
              size="20"
              color="gray"
              class="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <InputComponent
              name="username"
              id="username"
              placeholder="Nombre de Usuario"
              class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-textVariant2"
            >Contraseña</label
          >
          <div class="relative">
            <Icon
              name="Lock"
              size="20"
              color="gray"
              class="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <InputComponent
              name="password"
              id="password"
              type="password"
              placeholder="Contraseña"
              class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded"
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="default"
          class="w-full mt-6 bg-buttonVariantTertiary text-background hover:bg-buttonPrimary py-2 rounded-lg"
        >
          Ingresar
        </Button>
      </form>
      <div class="flex justify-between items-center mt-4 text-sm">
        <Link
          href="/forgot-password"
          variant="default"
          class="hover:underline text-textVariant2"
        >
          ¿Olvidó su contraseña?
        </Link>
      </div>
      <div class="flex justify-between items-center mt-6 border-t pt-4 text-sm">
        <Link
          href="/register"
          variant="default"
          class="hover:underline flex items-center gap-2 text-textPrimary"
        >
          Crea tu cuenta aquí
          <Icon name="ArrowRight" size="20" color="textPrimary" />
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";

const name = ref("SaborApp");

definePageMeta({
  layout: "authLayout",
});
</script>

<style scoped>
.bgContent {
  background-image: url("../../../public/images/welcome.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  animation: moveBackground 15s infinite linear;
}

.bgContent::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: none;
  z-index: 1;
}
</style>
