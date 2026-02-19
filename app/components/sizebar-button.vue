<script lang="ts" setup>
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div class="tooltip-right" :data-tip="!props.showLabel ? props.label : undefined" :class="{ tooltip: !showLabel }">
    <NuxtLink :to="props.href" :class="{ 'bg-base-200': route.path === props.href }" class="flex justify-start gap-2 p-4 hover:bg-base-300 hover:cursor-pointer flex-nowrap">
      <Icon :name="props.icon" size="24" />
      <Transition name="grow">
        <span v-if="props.showLabel">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.1s;
}
.grow-leave-active {
  animation: grow 0.1s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
