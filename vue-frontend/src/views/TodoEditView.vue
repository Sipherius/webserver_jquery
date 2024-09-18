<script setup lang="ts">
import TodoEdit from '@/components/TodoEdit.vue';

defineProps({
  id: String
});
</script>

<template>
  <TodoEdit :id="id"/>
</template>
