<script setup lang="ts">
import TodoDelete from '@/components/TodoDelete.vue';

defineProps({
  id: String
});
</script>

<template>
  <TodoDelete :id="id"/>
</template>
