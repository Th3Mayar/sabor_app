<!-- ButtonCellRenderer.vue -->
<template>
  <div class="flex space-x-2">
    <Button variant="orange" size="icon"> ✏️ </Button>
    <Button variant="danger" size="icon"> ❌ </Button>
    <Button variant="success" size="icon"> ✔️ </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
</script>
