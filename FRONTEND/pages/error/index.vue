<template>
  <AccessForbidden
    error=404
    title="Access Forbidden"
    message="You don't have permission to access this page."
  />
</template>

<script setup>
import AccessForbidden from "@/components/molecule/errors/AccessForbidden.vue";

definePageMeta({
  layout: "authLayout",
});
</script>
