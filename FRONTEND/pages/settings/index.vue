<template>
  <div
    class="max-w-4xl mx-auto p-6 bg-background dark:bg-dark-background shadow-md rounded-lg transition-all duration-300 ease-in-out"
  >
    <h1
      class="text-2xl font-bold mb-6 text-textPrimary dark:text-dark-textPrimary"
    >
      Configuración del Usuario
    </h1>

    <!-- Avatar Section -->
    <div class="mb-8">
      <h2
        class="text-lg font-semibold mb-4 text-textVariant1 dark:text-dark-textPrimary"
      >
        Avatar
      </h2>
      <div class="flex items-center space-x-4">
        <Avatar class="w-24 h-24 rounded-full shadow-inner" />
        <Button
          @click="changeAvatar"
          variant="default"
          class="transition-all duration-300 transform hover:scale-105"
        >
          Cambiar Avatar
        </Button>
      </div>
    </div>

    <!-- Theme Customization -->
    <div class="mb-8">
      <h2
        class="text-lg font-semibold mb-4 text-textVariant1 dark:text-dark-textPrimary"
      >
        Personaliza tu Tema
      </h2>
      <div class="flex items-center space-x-4 mb-4">
        <label
          for="color"
          class="block text-textVariant2 dark:text-dark-textPrimary"
        >
          Selecciona un color:
        </label>
        <input
          type="color"
          id="color"
          v-model="themeColor"
          @input="updateThemeColors"
          class="w-12 h-12 border rounded-lg p-1 cursor-pointer transition-all duration-300 transform hover:scale-105"
        />
      </div>
      <div class="flex items-center">
        <label class="block text-textVariant2 dark:text-dark-textPrimary mr-4">
          Seleccione un tema:
        </label>
        <select
          v-model="$colorMode.preference"
          class="form-select text-textVariant2 dark:text-dark-background"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>

    <!-- Notifications Section -->
    <div class="mb-8">
      <h2
        class="text-lg font-semibold mb-4 text-textVariant1 dark:text-dark-textPrimary"
      >
        Notificaciones
      </h2>
      <TagsInput
        placeholder="Configura tus notificaciones"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-buttonPrimary transition ease-in-out duration-300"
      />
    </div>

    <!-- Additional Preferences -->
    <div class="mb-8">
      <h2
        class="text-lg font-semibold mb-4 text-textVariant1 dark:text-dark-textPrimary"
      >
        Preferencias Adicionales
      </h2>
      <div class="flex space-x-4">
        <Button
          @click="openPreferencesDialog"
          variant="link"
          class="transition-all duration-300 transform hover:scale-105"
        >
          Configurar Preferencias
        </Button>
        <Button
          @click="savePreferences"
          variant="link"
          class="transition-all duration-300 transform hover:scale-105"
        >
          Guardar
        </Button>
        <Button
          @click="showNotification"
          variant="link"
          class="transition-all duration-300 transform hover:scale-105"
        >
          Mostrar Notificación
        </Button>
      </div>
    </div>

    <!-- Dialog for Additional Preferences -->
    <Dialog v-model="isPreferencesDialogOpen" title="Preferencias Adicionales">
      <p class="text-textVariant2 dark:text-dark-textPrimary">
        Aquí puedes configurar tus preferencias adicionales.
      </p>
      <Button @click="savePreferences" variant="success" class="mt-4">
        Guardar Preferencias
      </Button>
    </Dialog>

    <!-- Notification Component -->
    <Sonner v-if="isSonnerVisible" @close="isSonnerVisible = false">
      Preferencias guardadas con éxito.
    </Sonner>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import tinycolor from "tinycolor2";
import Avatar from "@/components/ui/avatar/Avatar.vue";
import Button from "@/components/atoms/Button.vue";
import TagsInput from "@/components/ui/tags-input/TagsInput.vue";
import Dialog from "@/components/ui/dialog/Dialog.vue";
import Sonner from "@/components/ui/sonner/Sonner.vue";

// State for theme color
const themeColor = ref("#4f46e5");

// State for visibility of dialog
const isPreferencesDialogOpen = ref(false);

// State for visibility of notification
const isSonnerVisible = ref(false);

const changeAvatar = () => {
  console.log("Change Avatar clicked");
  // Dialog for changing avatar
};

// Function to update theme colors
const updateThemeColors = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const baseColor = tinycolor(target.value);

  const backgroundColor = baseColor.lighten(40).toString();
  const textColor = baseColor.isLight()
    ? baseColor.darken(60).toString()
    : baseColor.lighten(60).toString();
  const buttonPrimary = baseColor.toString();
  const buttonSecondary = baseColor.triad()[1].toString();

  document.documentElement.style.setProperty("--theme-color", target.value);
  document.documentElement.style.setProperty("--background", backgroundColor);
  document.documentElement.style.setProperty("--text-primary", textColor);
  document.documentElement.style.setProperty("--button-primary", buttonPrimary);
  document.documentElement.style.setProperty(
    "--button-secondary",
    buttonSecondary
  );

  themeColor.value = target.value;
};

// Function to view notification
const showNotification = () => {
  isSonnerVisible.value = true;
};

// Function to open dialog when additional preferences are clicked
const openPreferencesDialog = () => {
  isPreferencesDialogOpen.value = true;
};

// Function to save preferences when clicked
const savePreferences = () => {
  console.log("Preferences saved");
  isPreferencesDialogOpen.value = false;
  showNotification();
};

onMounted(() => {
  updateThemeColors({
    target: { value: themeColor.value },
  } as unknown as Event);
});
</script>
