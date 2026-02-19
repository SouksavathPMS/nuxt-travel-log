<script setup lang="ts">
const isSidebarOpen = ref(false);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

function toggleSizebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300 ease-in-out" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div class="flex hover:cursor-pointer hover:bg-base-200 p-4" :class="{ 'justify-end': isSidebarOpen, 'justify-center': !isSidebarOpen }">
        <Icon :name="isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'" size="32" @click="toggleSizebar" />
      </div>
      <SizebarButton :show-label="isSidebarOpen" label="Locations" icon="tabler:map" href="/dashboard" />
      <SizebarButton :show-label="isSidebarOpen" label="Add Location" icon="tabler:square-rounded-plus" href="/dashboard/add" />
      <div class="divider" />
      <SizebarButton :show-label="isSidebarOpen" label="Sign Out" icon="tabler:logout-2" href="/sign-out" />
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
