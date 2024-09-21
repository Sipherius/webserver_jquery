<script setup lang="ts">
withDefaults(defineProps<{
  gap: string,
  spacing: string,
}>(), {
  gap: 'gap-x-2',
  spacing: 'justify-end'
})
</script>

<template>
  <div class="flex" :class="[gap, spacing]">
    <slot></slot>
  </div>
</template>
