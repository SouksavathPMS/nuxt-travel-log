<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.signOut();
});
</script>

<template>
  <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col items-center justify-center">
    <span class="loading loading-spinner loading-xl" />
  </div>
</template>
