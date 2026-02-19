import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined"
    ? window.location.origin // uses whatever domain the app is on
    : "https://nuxt-travel-log-seven-rosy.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
});

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }
  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
  }
  async function signOut() {
    await authClient.signOut();
    navigateTo("/");
  }
  return {
    init,
    loading,
    signIn,
    signOut,
    user,
  };
});
