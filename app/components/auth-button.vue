<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div>
    <div v-if="authStore.user && !authStore.loading" class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn m-1">
        <div v-if="authStore.user.image" class="avatar">
          <div class="w-6 rounded-full">
            <img :src="authStore.user.image">
          </div>
        </div>
        {{ authStore.user.name }}
      </div>
      <ul tabindex="-1" class="dropdown-content menu bg-base-200 rounded-box z-1 w-32 p-2 shadow-sm">
        <li>
          <NuxtLink to="/dashboard">
            Dashboard
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/sign-out">
            <Icon name="tabler:logout-2" size="22" />
            Sign out
          </NuxtLink>
        </li>
      </ul>
    </div>
    <button v-else :disabled="authStore.loading" class="btn btn-accent" @click="authStore.signIn">
      Sign in with GitHub
      <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
      <Icon v-else name="tabler:brand-github" size="22" />
    </button>
  </div>
</template>
