<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 bg-cover bgContent"
  >
    <div class="absolute inset-0 bg-black bg-opacity-60 rounded-3xl"></div>
    <div class="bg-background rounded-3xl shadow-lg w-full max-w-max z-50">
      <div class="flex flex-col justify-center items-center text-center">
        <ImageComponent name="saborApp2" size="150" />
        <h2 class="text-3xl font-bold mt-4">Registro</h2>
        <p class="mt-2 text-textVariant2">
          Crea una cuenta en {{ appName }} y disfruta de nuestros servicios.
        </p>
      </div>
      <form
        @submit.prevent="registerUser"
        class="flex flex-col items-center p-8"
      >
        <section class="grid grid-cols-2 gap-3">
          <div class="mb-4">
            <label for="full_name" class="block text-textVariant2"
              >Nombre Completo</label
            >
            <div class="relative">
              <Icon
                name="User"
                size="20"
                color="gray"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="full_name"
                id="full_name"
                v-model="user.full_name"
                placeholder="Nombre Completo"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded"
                required
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="contact_phone" class="block text-textVariant2"
              >Teléfono de Contacto</label
            >
            <div class="relative">
              <Icon
                name="Phone"
                size="20"
                color="gray"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="contact_phone"
                id="contact_phone"
                v-model="user.contact_phone"
                placeholder="Teléfono de Contacto"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded"
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-textVariant2"
              >Correo Electrónico</label
            >
            <div class="relative">
              <Icon
                name="Mail"
                size="20"
                color="gray"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <InputComponent
                name="email"
                id="email"
                v-model="user.email"
                placeholder="Correo Electrónico"
                type="email"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded"
                required
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
                v-model="user.password"
                placeholder="Contraseña"
                type="password"
                class="w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-buttonPrimary border-textVariant1 rounded"
                required
              />
            </div>
          </div>
        </section>
        <Button
          type="submit"
          variant="default"
          class="w-60 mt-3 bg-buttonVariantTertiary text-background hover:bg-buttonPrimary py-2 rounded-lg"
        >
          Registrarse
        </Button>
      </form>
      <div
        class="flex justify-end border-t pt-4 text-sm bg-contentButton p-5 rounded-b-3xl"
      >
        <Link
          href="/login"
          variant="default"
          class="hover:underline flex gap-2 text-textPrimary"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ImageComponent from "@/components/atoms/ImageByName.vue";
import InputComponent from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Icon from "@/components/atoms/IconByName.vue";
import Link from "@/components/atoms/Link.vue";

const router = useRouter();

const appName = ref("SaborApp");

const user = ref({
  full_name: "",
  contact_phone: "",
  email: "",
  password: "",
});

const registerUser = async (e) => {
  e.preventDefault();
  console.log(user.value);
  // try {
  //   const response = await axios.post("/api/register", user.value);
  //   if (response.data.success) {
  //     router.push("/login");
  //   } else {
  //     console.error(response.data.message);
  //   }
  // } catch (error) {
  //   console.error("Error al registrar el usuario:", error);
  // }
};

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
}
</style>