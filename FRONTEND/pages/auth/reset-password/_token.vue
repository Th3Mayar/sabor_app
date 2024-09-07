<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
      <Form @submit="handleSubmit">
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">
            Nueva Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">
          Restablecer Contraseña
        </button>
      </Form>

      <!-- Mostrar alerta si hay un error -->
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { urlAPI } from "@/composables/api/url";

const password = ref("");
const error = ref(null);
const route = useRoute();
const router = useRouter();

const handleSubmit = async () => {
  const token = route.params.token;
  try {
    const response = await fetch(`${urlAPI}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
        "x-api-key": `${process.env.VUE_APP_API_KEY}`,
      },
      body: JSON.stringify({
        token,
        newPassword: password.value,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "Error al restablecer la contraseña"
      );
    }

    router.push("/login");
  } catch (err) {
    error.value = err.message;
  }
};
</script>