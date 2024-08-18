<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="">
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "authLayout",
});
</script>
